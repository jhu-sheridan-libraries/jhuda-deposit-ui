import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard', { path: '/' });

  this.route('submission', function() {
    this.route('workflow', { path: '/new' }, function() {
      this.route('agreements');
      this.route('metadata');
      this.route('files');
    });
    this.route('details', { path: '/:submission_id' });
  });
});

export default Router;
