import Component from '@glimmer/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MetadataStatusCell extends Component {
  @service('submission-handler')
  submissionHandler;

  @computed
  get status() {
    const submission = get(this, 'args.submission') || get(this, 'args.record');
    return this.submissionHandler.submissionMetadataStatus(submission);
  }
}