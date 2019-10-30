import Route from '@ember/routing/route';

/**
 * This is meant to be a wrapper route around workflow steps that will be nested.
 */
export default Route.extend({
  model() {
    return this.get('store').createRecord('submission');
  }
});
