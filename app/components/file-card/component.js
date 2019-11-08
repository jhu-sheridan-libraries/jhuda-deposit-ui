import Component from '@glimmer/component';
import { set } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class FileCardComponent extends Component {
  @alias('args.fileGrp.file') file;
  @alias('args.fileGrp.actions') actions;
  @alias('args.fileGrp.hasActions') hasActions;

  editing = false;
  tmpDescription;

  toggleEditing() {
    if (!this.editing) {
      set(this, 'tmpDescription', this.file.description);
    }
    set(this, 'editing', !this.editing);
  }

  saveMd() {
    set(this, 'file.description', this.tmpDescription);
    this.toggleEditing();
  }

  cancelEdit() {
    this.toggleEditing();
  }
}
