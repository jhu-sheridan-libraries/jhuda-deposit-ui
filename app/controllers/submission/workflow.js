import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  routeOrder: () => ['agreements', 'metadata', 'files'],

  routePrefix: computed('router.currentRouteName', function () {
    const path = this.get('router').get('currentRouteName').split('.');
    return path.slice(0, path.length -1).join('.');
  }),
  currentRoute: computed('router.currentRouteName', function () {
    return this.get('router').get('currentRouteName').split('.').pop();
  }),

  newRoute(simpleName) {
    return `${this.get('routePrefix')}.${simpleName}`;
  },

  actions: {
    back() {
      const order = this.get('routeOrder')();
      const index = order.indexOf(this.get('currentRoute'));

      if (index === 0 || index > order.length) {
        this.transitionToRoute(this.newRoute(order[0]));
        return;
      }

      this.transitionToRoute(this.newRoute(order[index-1]));
    },

    next() {
      const order = this.get('routeOrder')();
      const index = order.indexOf(this.get('currentRoute'));

      if (index === -1) {
        this.transitionToRoute(this.newRoute(order[0]));
        return;
      } else if (index === order.length - 1) {
        // Do nothing
        return;
      }

      this.transitionToRoute(this.newRoute(order[index+1]));
    }
  }

});
