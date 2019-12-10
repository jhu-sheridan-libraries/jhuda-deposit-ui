import Component from '@glimmer/component';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class SubmissionActionCell extends Component {
  @service router;

  @alias('args.record') submission;
  @alias('args.record.status') status;

  get editable() {
    return this.status === 'draft' || this.status === 'requiresAction';
  }

  /**
   * Only DRAFT submissions are removable (TODO:) by the submission creator
   */
  get removable() {
    return this.editable;
  }

  @action
  delete() {
    this.submission.destroyRecord();
    this.router.transitionTo('/'); // Shouldn't trigger a transition if we're already on this route
  }
}
