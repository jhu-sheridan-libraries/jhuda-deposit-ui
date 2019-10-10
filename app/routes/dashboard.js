import Route from '@ember/routing/route';
import Bootstrap4Theme from 'ember-models-table/themes/bootstrap4';

export default Route.extend({
  model() {
    // Load all submissions to be displayed here
    return this.store.query('submission', { user: '1' }, { include: 'files' });
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('columns', [
      { propertyName: '_metadataJson.title', title: 'Submission Name', component: 'submission-title-cell' },
      { propertyName: 'status', title: 'Submission Status' },
      { propertyName: 'metadataStatus', title: 'Metadata Status' },
      { propertyName: 'files.length', title: 'Files' },
      { propertyName: 'filesStatus', title: 'Files Status' }
    ]);
    controller.set('themeInstance', Bootstrap4Theme.create());
  }
});
