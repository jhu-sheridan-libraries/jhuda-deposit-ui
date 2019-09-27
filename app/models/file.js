import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  externalId: DS.attr('string'),
  description: DS.attr('string'),

  /** uploading, scanning, changesRequired, accepted, acceptedAndEncrypted? */
  status: DS.attr('string')
});
