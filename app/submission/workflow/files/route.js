import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { get } from '@ember/object';

export default Route.extend({
  model() {
    const parentModel = this.modelFor('submission.workflow');

    return hash({
      submission: get(parentModel, 'submission')
    });
  }
});
