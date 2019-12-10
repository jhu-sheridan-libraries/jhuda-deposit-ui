import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model } = DS;

export default Model.extend({
  // user: DS.belongsTo('user', { async: true }),
  user: DS.attr('string'),
  accessUrl: DS.attr('string'), // URL in the archive, will only appear when the submission is COMPLETE

  /** List of File objects associated with this submission */
  files: DS.hasMany('file', { async: true }),

  /** enum: draft, pendingReview, requiresAction, complete, published */
  status: DS.attr('string'),  // Submission summary status
  metadataStatus: DS.attr('string'), // draft, pendingReview, requiresAction, approved
  filesStatus: DS.attr('string'), // processing, pendingReview, requiresAction, approved
  metadata: DS.attr('string'),

  requiredActions: DS.hasMany('submission-action'),

  /**
   * Get the JSON representation of the metadata string. Not part of the persisted model
   * @returns {Object}: the parsed JSON object
   *          or `undefined` if metadata is an invalid value
   */
  _metadataJson: computed('metadata', function () {
    try {
      return JSON.parse(this.get('metadata'));
    } catch (e) {
      return undefined;
    }
  })
});
