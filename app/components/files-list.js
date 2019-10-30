import Component from '@ember/component';

export default Component.extend({
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
