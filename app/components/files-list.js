import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({

  /**
   * Combine files with any associated actions so they can be displayed
   */
  filesWithActions: computed(
    'files',
    'submissionActions',
    'submissionActions.@each.{key,description}',
    function () {
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
  ),

  actions: {
    /**
     * Bubble the remove request up to parent component if `removeAction` is defined
     * @param {File} file file obj
     */
    doRemove(file) {
      this.removeAction(file);
    },

    /**
     * Bubble the 'edit' request up to parent component if `editAction` is defined
     * @param {File} file
     */
    doEdit(file) {
      this.editAction(file);
    }
  }
});
