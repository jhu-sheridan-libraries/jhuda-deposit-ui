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

