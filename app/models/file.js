import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  externalId: DS.attr('string'),
  description: DS.attr('string'),

  /** processing, changesRequired, accepted, published */
  status: DS.attr('string')
});
