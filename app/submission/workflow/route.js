import Route from '@ember/routing/route';
import { hash } from 'rsvp';

/**
 * This is meant to be a wrapper route around workflow steps that will be nested.
 */
export default class SubmissionWorkflowRoute extends Route {
  queryParams = {
    id: { refreshModel: true }
  };

  model(params) {
    let submission;

    if (params.id) {
      submission = this.store.findRecord('submission', params.id);
    } else {
      submission = this.store.createRecord('submission');
    }

    return hash({
      submission
    });
  }
}
