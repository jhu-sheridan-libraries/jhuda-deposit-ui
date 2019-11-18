import Service from '@ember/service';
import { alias } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import { task } from 'ember-concurrency';

export default class ModalManagerService extends Service {
  @alias('appController.modal') modal;

  get appController() {
    return getOwner(this).lookup('controller:application');
  }

  showModal(modal) {
    const appController = this.get(`appController`);
    modal.routeName = this.appController.currentRouteName;
    appController.set('modal', modal);
  }

  closeModal(model) {
    if (model.get('isNew')) {
      model.rollbackAttributes();
    }
    this.appController.set('modal', null);
  }

  @task
  save = function * (formData) {
    yield formData.save();
    this.closeModal(this.modal.model);
  }
}
