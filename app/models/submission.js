import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model } = DS;

export default Model.extend({
  user: DS.belongsTo('user'),
  accessUrl: DS.attr('string'), // URL in the archive, will only appear when the submission is COMPLETE

  /** enum: draft, uploadingFiles, scanning, changesRequired, complete */
  status: DS.attr('string'),  // Submission summary status
  metadataStatus: DS.attr('string'),
  filesStatus: DS.attr('string'),
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
