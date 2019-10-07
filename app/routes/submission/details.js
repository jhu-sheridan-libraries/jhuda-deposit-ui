import Route from '@ember/routing/route';

/**
 * This route is meant to display detailed information about a single submission.
 * The submission ID should be a path parameter, as defined in the router.js
 */
export default Route.extend({

  model (params) {
    return this.store.findRecord('submission', params.submission_id);
  }

});
