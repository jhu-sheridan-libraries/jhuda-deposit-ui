import Component from '@glimmer/component';
import { inject as service } from '@ember/service'
import { action } from '@ember/object';

export default class SharedModalComponent extends Component {
  @service modalManager;

  @action
  hide() {
    this.modalManager.closeModal(this.modal.model);
  }
}
