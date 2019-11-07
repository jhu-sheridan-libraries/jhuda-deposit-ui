import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  submission: alias('model.submission'),

  files: computed('submission', function () {
    return get(this, 'submission.files');
  }),

  init() {
    this._super(...arguments);
  },
  actions: {
    removeFile(/* file */) {
      // debugger
    },
    editFile(/* file */) {
      // debugger
    }
  }
});
