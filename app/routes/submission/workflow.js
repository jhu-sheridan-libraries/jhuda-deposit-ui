import Route from '@ember/routing/route';
import { hash } from 'rsvp';

/**
 * This is meant to be a wrapper route around workflow steps that will be nested.
 */
export default Route.extend({
  model() {
    const submission = this.get('store').createRecord('submission');
    return hash({
      submission
    });
  }
});
