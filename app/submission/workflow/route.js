import Route from '@ember/routing/route';
import { hash } from 'rsvp';

/**
 * This is meant to be a wrapper route around workflow steps that will be nested.
 */
// export default Route.extend({
//   model(params) {
//     debugger
//     const submission = this.get('store').createRecord('submission');
//     return hash({
//       submission
//     });
//   }
// });
export default class SubmissionWorkflowRoute extends Route {
  queryParams = {
    id: { refreshModel: true }
  };

  model(params) {
    console.log(params);
    const submission = this.get('store').createRecord('submission');
    return hash({
      submission
    });
  }
}
