import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

/**
 * Expects one property to be specified when invoking this component:
 *
 * * appId - application ID of the calling app in Azure
 */
export default class OnedriveFilePickerComponent extends Component {
  @service onedrive;

  @action
  launchPicker() {
    const appId = this.args.appId;

    const options = {
      action: 'query',
      multiSelect: true,
      viewType: 'all',
      advanced: {
        queryParameters: 'expand=thumbnails,children(expand=thumbnails)'
      }
    };

    try {
      this.onedrive.launchFilePicker(options, appId, true);
    } catch (e) {
      if (e.message === 'no-app-id') {
        throw new Error(
          'Invalid application ID found. The OnedriveFilePicker component was not given a valid appId'
        );
      }
    }
  }
}

/*
async function doStuff(response) {
  if ('errorCode' in response) {
    return;
  }
  console.log('%cOneDrive success', 'color: green;');
  console.log(response);

  const files = response.value.filter(obj => 'file' in obj);
  const folders = response.value.filter(obj => 'folder' in obj);

  folders.forEach(async (folder) => {
    const stuff = await getAllChildren(folder, {
      accessToken: response.accessToken,
      apiEndpoint: response.apiEndpoint
    });
    files.push(...stuff);
  });

  console.log('Files?');
  console.log(files);

  // return files;
}

function launchOneDrivePicker(){
  var odOptions = {
    clientId: 'uuid',
    action: 'query',
    multiSelect: true,
    viewType: 'all',
    advanced: {
      queryParameters: 'expand=thumbnails,children(expand=thumbnails)'
    },
    success: doStuff,
    cancel: function () { console.log('Picker cancelled'); },
    error: function (error) { console.log(error); }
  };
  OneDrive.open(odOptions);
}

async function getAllChildren (folderItem, opts) {
  let files = [];
  // debugger
  if ('children' in folderItem) {
    // If there are children, investigate them
    files.push(folderItem.children.filter(obj => 'file' in obj));
    folderItem.children.filter(obj => 'folder' in obj).forEach(async (folder) => {
      const stuff = await getAllChildren(folder, opts)
      files.push(stuff);
    });
    // console.log('%cChildren:', 'color:yellow;');
    // console.log(...files);
    return files;
  } else {
    // If no children to investigate, request info from OneDrive
    const url = `${opts.apiEndpoint}me/drive/items/${folderItem.id}/children`;

    const results = await fetch(url, {
      headers: {
        Authorization: `Bearer ${opts.accessToken}`
      },
      accept: "application/json;odata.metadata=none"
    });

    const json = await results.json();

    const files = json.value.filter(obj => 'file' in obj);
    const folders = json.value.filter(obj => 'folder' in obj);

    folders.forEach(async (folder) => {
      const children = await getAllChildren(folder, {
        accessToken: json.accessToken,
        apiEndpoint: json.apiEndpoint
      });
      files.push(...children);
    });
    // console.log('%cChildren:', 'color: blue;');
    // console.log(...files);
    return files;
  }
}

Sample OneDrive file response

{
  "@microsoft.graph.downloadUrl": "https://livejohnshopkins-my.sharepoint.com/personal/jabrah20_jh_edu/_layouts/15/download.aspx?UniqueId=c0fb24f5-8ef1-4a94-8b17-524e465f6da9&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbGl2ZWpvaG5zaG9wa2lucy1teS5zaGFyZXBvaW50LmNvbUA5ZmE0ZjQzOC1iMWU2LTQ3M2ItODAzZi04NmY4YWVkZjBkZWMiLCJpc3MiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAiLCJuYmYiOiIxNTc0MjYyNjc4IiwiZXhwIjoiMTU3NDI2NjI3OCIsImVuZHBvaW50dXJsIjoiWWdkNDVuSDZuYVI5bCsvemd0MzBLME5zaGl3RVF2OWZlQVlBNXk0K1VwYz0iLCJlbmRwb2ludHVybExlbmd0aCI6IjE1NSIsImlzbG9vcGJhY2siOiJUcnVlIiwiY2lkIjoiWVdRNE0yUXpOalV0TURrMU9TMDBNalkwTFRsbVlqSXRZemxrTUdNMk9XUXlaakptIiwidmVyIjoiaGFzaGVkcHJvb2Z0b2tlbiIsInNpdGVpZCI6IlpHTmhabVJpWVRjdE5UY3hPUzAwWkRrMUxUa3dPRGd0WkRRd1pqZG1NbUl5WXpReCIsImFwcF9kaXNwbGF5bmFtZSI6ImJhaGstcGlja2VyLXRlc3QiLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiQWJyYWhhbXMiLCJhcHBpZCI6IjUxYmQwNjM2LWY1ZmUtNGMwZC05MTlhLWJmNjA3NmE1MmQwMSIsInRpZCI6IjlmYTRmNDM4LWIxZTYtNDczYi04MDNmLTg2ZjhhZWRmMGRlYyIsInVwbiI6ImphYnJhaDIwQGpoLmVkdSIsInB1aWQiOiIxMDAzM0ZGRjhBQ0I3QjA2IiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzNmZmY4YWNiN2IwNkBsaXZlLmNvbSIsInNjcCI6ImFsbGZpbGVzLnJlYWQgYWxscHJvZmlsZXMucmVhZCIsInR0IjoiMiIsInVzZVBlcnNpc3RlbnRDb29raWUiOm51bGx9.UGNWWTEvb2xNUnZNNllaZXhSRGJNN1VPMnEvNWM4QjIzMmR2ZVFxVlovQT0&ApiVersion=2.0",
  "createdDateTime": "2019-11-13T19:59:10Z",
  "eTag": "\"{uuid},1\"",
  "id": "12p3oiu4h",
  "lastModifiedDateTime": "2019-11-13T19:59:10Z",
  "name": "BL615d7.aor.111r.xml",
  "webUrl": "https://example.org/files/moo.xml",
  "cTag": "\"c:{uuid},1\"",
  "size": 2270,
  "createdBy": {
    "user": {
      "email": "email@email.moo",
      "id": "uuid",
      "displayName": "Moo Jones"
    }
  },
  "lastModifiedBy": {
    "user": {
      "email": "email@email.moo",
      "id": "uuid",
      "displayName": "Moo Jones"
    }
  },
  "parentReference": {
    "driveId": "opaque_string",
    "driveType": "business",
    "id": "some_id",
    "path": "/drive/root:/moo/mooington"
  },
  "file": {
    "mimeType": "text/xml",
    "hashes": {
      "quickXorHash": "7AVzx90dwGDm4bwtUtP06yIZS3o="
    }
  },
  "fileSystemInfo": {
    "createdDateTime": "2019-11-13T19:59:10Z",
    "lastModifiedDateTime": "2019-11-13T19:59:10Z"
  }
}
*/
