import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed, set } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class FileCardComponent extends Component {
  // Named arguments passed into the component
  fileGrp;
  removeAction;
  editAction;
  editable;
  index;

  // Model aliases
  @alias('args.fileGrp.file') file;
  @alias('args.fileGrp.actions') actions;
  @alias('args.fileGrp.hasActions') hasActions;

  @tracked editing = false;
  tmpDescription;

  @computed('index')
  get noTop() {
    return this.args.index > 0;
  }

  toggleEditing() {
    // if (!this.editing) {
    //   set(this, 'tmpDescription', this.file.description);
    // }
    set(this, 'editing', !this.editing);
  }

  saveMd() {
    // set(this, 'file.description', this.tmpDescription);
    this.file.save();
    this.toggleEditing();
  }

  cancelEdit() {
    this.file.rollbackAttributes();
    this.toggleEditing();
  }
}
