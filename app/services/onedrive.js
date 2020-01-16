import Service from '@ember/service';
import { all } from 'ember-concurrency';
import { task, dropTask } from 'ember-concurrency-decorators';

export default class OnedriveService extends Service {
  /**
   * Launch the OneDrive file picker with the given options. This will open a new window with
   * the Microsoft authentication workflow and OneDrive interface. The calling code is responsible
   * for providing the appropriate application ID and API key. Without this information, OneDrive
   * will refuse to authenticate. Once the file picker is launched, a Promise is returned.
   *
   * The first time a user initiates this OneDrive interaction, they must grant your application
   * read access to their OneDrive. After permission has been granted (and any subsequent time
   * they launch the file picker), the user will be presented with the OneDrive file picker
   * interface, where they will be able to select one or more files and directories.
   *
   * After the user selects one or more files in the file picker, the returned promise will
   * resolve to an array of DriveItems. This function can optionally follow any selected folders
   * to drill down to fetch any contained files. If this option is not desired, the set of DriveItems
   * may include both Files and Folders.
   *
   * See the Microsoft documentation for detailed descriptions:
   * https://docs.microsoft.com/en-us/onedrive/developer/rest-api/resources/driveitem?view=odsp-graph-online
   *
   * Errors will be thrown if the application ID is not provided or if the OneDrive SDK is not found.
   *
   * The returned Promise will be rejected if the user cancels the file selection, either by clicking
   * the Cancel button provided in the interface or by closing out of the file picker window.
   *
   * The returned Promise can also be rejected if the OneDrive SDK encounters any other errors.
   *
   * @param {object} options OneDrive options
   * @param {string} appId application ID for the calling application in Azure
   * @param {boolean} followDirs follow directories to get a list of all child items
   * @returns {array} a Promise that resolves to a list of OneDrive DriveItems
   */
  @dropTask
  // eslint-disable-next-line require-yield
  launchFilePicker = function* (options, appId, followDirs) {
    if (!appId) {
      throw new Error('no-app-id');
    }

    return new Promise(function (resolve, reject) {
      let odOptions = {
        clientId: appId,
        success: (response) => this._process(response, followDirs, resolve).perform(),
        cancel: reject(),
        error: reject
      };
      Object.assign(odOptions, options);

      // eslint-disable-next-line no-undef
      if (!OneDrive) {
        throw new Error('OneDrive SDK not found');
      }

      // eslint-disable-next-line no-undef
      OneDrive.open(odOptions);
    });
  }

  /**
   * Process the response from OneDrive file selection before resolving the initial Promise.
   *
   * We must inspect the response from the OneDrive file selection to derive a set of files.
   * Since we allow the user to select multiple items, including folders, in their OneDrive,
   * we may follow directories recursively to get all files contained within the selection.
   * This effectively flattens the file hierarchy in OneDrive.
   *
   * See the Microsoft documentation for more details on handling OneDrive reponses:
   * https://docs.microsoft.com/en-us/onedrive/developer/controls/file-pickers/js-v72/open-file?view=odsp-graph-online#4-handling-the-picker-response-object
   *
   * A sample response should look like
   *
   * ``` javascript
   * {
   *    "accessToken": "",  // Token that can be used for subsequent API requests
   *    "apiEndpoint": "",  // Endpoint that the access token can be used with
   *    "value": [  // List of DriveItems
   *      { ... } // A DriveItem
   *    ]
   * }
   * ```
   *
   * See the Microsoft documentation for detailed descriptions of DriveItems:
   * https://docs.microsoft.com/en-us/onedrive/developer/rest-api/resources/driveitem?view=odsp-graph-online
   *
   * @param {object} response data from the OneDrive file picker
   * @param {boolean} followDirs should we follow directories to get child items?
   * @param {function} resolve this will finish the overall Promise and return to initial caller
   */
  @task
  _process = function* (response, followDirs, resolve) {
    const result = [];

    const files = response.value.filter(obj => 'file' in obj);
    result.push(...files);

    if (!followDirs) {
      resolve(result);
      return;
    }

    // If the 'followDirs' flag is TRUE, continue to get folder contents
    const opts = {
      accessToken: response.accessToken,
      apiEndpoint: response.apiEndpoint
    };

    const fetches = [];
    for (let folder of response.value.filter(obj => 'folder' in obj)) {
      fetches.push(this._getFilesInFolder.perform(folder, opts, followDirs));
    }

    const children = yield all(fetches);
    result.push(...children.flat());

    resolve(result);
  }

  /**
   * Get all files within a given folder including children of sub-folders, etc
   *
   * @param {DriveItem} driveItem representing a Folder item
   *  {
   *    id: '', // OneDrive ID for the folder
   *  }
   * @param {object} opts options
   *  {
   *    accessToken: '',
   *    apiEndpoint: ''
   *  }
   * @param {boolean} followDirs should you follow sub-folders?
   */
  @task
  _getFilesInFolder = function* (driveItem, opts, followDirs) {
    let result = [];

    const url = `${opts.apiEndpoint}me/drive/items/${driveItem.id}/children`;

    const odResp = yield fetch(url, {
      headers: { Authorization: `Bearer ${opts.accessToken}` },
      accept: 'application/json;odata.metadata=none'
    });

    const json = yield odResp.json();

    const newOpts = {
      apiEndpoint: json.apiEndpoint,
      accessToken: json.accessToken
    };

    // First compile all Files in this folder
    const files = json.value.filter(item => 'file' in item);
    result.push(...files);

    if (!followDirs) {
      return result;
    }

    // Then resolve all sub-folders as list of files
    // Each sub-folder should resolve as an array of child items
    const fetches = [];
    for (let folder of json.value.filter(item => 'folder' in item)) {
      fetches.push(this._getFilesInFolder.perform(folder, newOpts, followDirs));
    }

    // This should be an array of arrays. Wait until all child requests finish
    let results = yield all(fetches);
    result.push(...results.flat());

    return result;
  }
}
