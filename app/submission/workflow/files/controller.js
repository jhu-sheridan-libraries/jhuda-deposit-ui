import Controller from '@ember/controller';
import { action, computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class WorkflowFilesController extends Controller {
  @alias('model.submission') submission;

  @computed('submission')
  get files() {
    return get(this, 'submission.files');
  }

  @computed
  get editable() {
    const status = get(this, 'submission.status');
    return status === 'draft' || status === 'requiresAction';
  }

  @action
  removeFile(/* file */) {
    // debugger
  }

  @action
  editFile(/* file */) {
    // debugger
  }
}
