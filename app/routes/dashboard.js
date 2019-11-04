import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import Bootstrap4Theme from 'ember-models-table/themes/bootstrap4';

export default Route.extend({

  /**
   * Load all submissions to be displayed here
   *
   * TODO: Submissions visible will be dependent on logged in user.
   * A user with a role of 'curator' or 'honest broker' or whatever should be able to
   * see all submissions. Any other user should see only submissions linked to them
   */
  model() {
    const submissions = this.store.query('submission', { user: '1' }, { include: 'files' });
    return hash({
      submissions
    });
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('columns', [
      { title: 'Submission Name', component: 'submission-title-cell' },
      { propertyName: 'status', title: 'Submission Status' },
      { propertyName: 'metadataStatus', title: 'Metadata Status' },
      { propertyName: 'files.length', title: 'Files', className: 'text-center' },
      { propertyName: 'filesStatus', title: 'Files Status' },
      { title: '', component: 'submission-action-cell' }
    ]);
    controller.set('themeInstance', Bootstrap4Theme.create());
  }
});
