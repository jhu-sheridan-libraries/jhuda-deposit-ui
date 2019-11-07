import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  submission: alias('record'),

  editable: computed('submission', function () {
    return this.get('submission.status') === 'draft';
  }),
  /**
   * Only DRAFT submissions are removable (TODO:) by the submission creator
   */
  removable: computed('submission', function () {
    return this.get('editable');
  }),

  actions: {
    delete(/* submission */) {

    }
  }

});
