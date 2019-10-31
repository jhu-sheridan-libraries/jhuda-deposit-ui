import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({

  /**
   * Combine files with any associated actions so they can be displayed
   */
  filesWithActions: computed('files', 'submissionActions', function () {
    const composition = [];

    const actions = this.get('submissionActions') || A();

    this.get('files').forEach((file) => {
      const id = file.get('id');

      composition.push({
        file,
        actions: actions.filter(a => a.get('key') === id)
      });
    });
    
    return composition;
  }),

  actions: {
    /**
     * Bubble the remove request up to parent component if `removeAction` is defined
     * @param {File} file file obj
     */
    doRemove(file) {
      if (this.removeAction) {
        this.removeAction(file);
      }
    },

    /**
     * Bubble the 'edit' request up to parent component if `editAction` is defined
     * @param {File} file
     */
    doEdit(file) {
      if (this.editAction) {
        this.editAction(file);
      }
    }
  }
});
