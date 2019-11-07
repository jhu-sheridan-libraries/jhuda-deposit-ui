import Component from '@ember/component';
import { action, computed, get } from '@ember/object';
import { A } from '@ember/array';

// export default Component.extend({
export default class FilesList extends Component {

  /**
   * Combine files with any associated actions so they can be displayed
   */
  @computed(
    'files',
    'submissionActions',
    'submissionActions.@each.{key,description}',
  )
  get filesWithActions() {
    const actions = get(this, 'submissionActions') || A();

    return get(this, 'files').map((file) => {
      const id = file.id;
      const fileActions = actions.filter(a => a.key === id);

      return {
        file,
        hasActions: fileActions.length > 0,
        actions: fileActions
      };
    });
  }

  /**
   * Bubble the remove request up to parent component if `removeAction` is defined
   * @param {File} file file obj
   */
  @action
  doRemove(file) {
    this.removeAction(file);
  }

  /**
   * Bubble the 'edit' request up to parent component if `editAction` is defined
   * @param {File} file
   */
  @action
  doEdit(file) {
    this.editAction(file);
  }
}
