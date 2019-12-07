import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { action } from '@ember/object';

/**
 * 'routeOrder' defines the order in which child routes should be presented
 * to the user.
 */
export default class SubmissionWorkflowController extends Controller {
  @service router;

  get routeOrder() {
    return [
      'agreements',
      'metadata',
      'files',
    ];
  }

  get routePrefix() {
    const path = get(this, 'router.currentRouteName').split('.');

    return path.slice(0, path.length -1).join('.');
  }

  get currentRoute() {
    return get(this, 'router.currentRouteName').split('.').pop();
  }

  newRoute(simpleName) {
    return `${this.routePrefix}.${simpleName}`;
  }

  @action
  back() {
    const order = this.routeOrder;
    const index = order.indexOf(this.currentRoute);

    if (index <= 0) {
      return;
    }

    this.transitionToRoute(this.newRoute(order[index-1]));
  }

  @action
  next() {
    const order = this.routeOrder;
    const index = order.indexOf(this.currentRoute);

    if (index === -1) {
      this.transitionToRoute(this.newRoute(order[0]));
      return;
    } else if (index === order.length - 1) {
      // Do nothing
      return;
    }

    this.transitionToRoute(this.newRoute(order[index+1]));
  }

  @action
  cancel() {
    this.transitionToRoute('dashboard');
  }
}
