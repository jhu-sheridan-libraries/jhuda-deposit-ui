import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class WorkflowFooterComponent extends Component {
  @action
  back() {}

  @action
  cancel() {}
}
