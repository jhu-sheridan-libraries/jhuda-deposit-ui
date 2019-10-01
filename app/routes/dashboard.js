import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    // Load all submissions to be displayed here
    return this.store.query('submission', { user: '1' }, { include: 'files' });
  }
});
