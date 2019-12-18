import { alias } from '@ember/object/computed';
import { action } from '@ember/object';
import Controller, {
  inject as controller
} from '@ember/controller';

export default class SubmissionWorkflowMetadataController extends Controller {
  @alias('model') metadata;

  @controller('submission.workflow') parentController;

  get mdDisplay() {
    if (!this.metadata) {
      return undefined;
    }

    return Object.keys(this.metadata).map((key) => {
      return {
        label: key,
        value: this.metadata[key]
      };
    });
  }

  @action
  cancel() {
    this.parentController.send('cancel');
  }

  @action
  back() {
    this.parentController.send('back');
  }

  @action
  next(allChangesets) {
    allChangesets.forEach((changeset) => changeset.execute());

    // some kind of saving occurs here in the future when we've built out how the models will get
    // serialized into the metadata string

    // Note, that send is not deprecated in the same way as sendAction
    this.parentController.send('next');
  }
}
