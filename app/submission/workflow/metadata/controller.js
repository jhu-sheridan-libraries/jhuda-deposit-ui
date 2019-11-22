import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default class SubmissionWorkflowMetadataController extends Controller {
  @alias('model') submission;
  @alias('submission._metadataJson') metadata;

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
}
