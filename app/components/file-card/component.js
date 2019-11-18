import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { alias } from '@ember/object/computed';

/**
 * Named arguments passed into the component
 *  - fileGrp
 *  - removeAction
 *  - editable
 *  - index
 */
export default class FileCardComponent extends Component {
  @alias('args.fileGrp.file') file;
  @alias('args.fileGrp.actions') subActions;
  @alias('args.fileGrp.hasActions') hasActions;

  editing = false;

  get noTop() {
    return this.args.index > 0;
  }

  @action
  toggleEditing() {
    set(this, 'editing', !this.editing);
  }

  @action
  saveMd() {
    this.file.save();
    this.toggleEditing();
  }

  @action
  cancelEdit() {
    this.file.rollbackAttributes();
    this.toggleEditing();
  }
}
