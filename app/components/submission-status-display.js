import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  status: computed('record', 'submission', function () {
    const submission = this.get('submission') || this.get('record');
    return submission.get('status');
  })
});
