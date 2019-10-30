import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  submission: alias('model'),

  files: computed('submission', function () {
    return this.get('submission.files');
  }),

  init() {
    this._super(...arguments);
  },
  actions: {
    removeFile(file) {
      debugger
    },
    editFile(file) {
      debugger
    }
  }
});
