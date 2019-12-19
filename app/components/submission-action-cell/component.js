import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class SubmissionActionCell extends Component {
  @service router;

  @alias('args.record') submission;
  @alias('args.record.status') status;

  @tracked showDeleteModal = false;

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
  toggleDelete() {
    // TODO: wrap in try/catch or handle errors by some other means
    this.showDeleteModal = !this.showDeleteModal;
  }

  @action
  delete() {
    this.submission.destroyRecord();
    this.router.transitionTo('/'); // Shouldn't trigger a transition if we're already on this route
  }
}
