import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  submissionHandler: service('submission-handler'),

  status: computed('record', 'submission', function () {
    const submission = this.get('submission') || this.get('record');
    return this.submissionHandler.submissionStatusDisplay(submission);
  })
});
