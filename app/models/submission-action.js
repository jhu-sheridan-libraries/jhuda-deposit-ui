import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  key: DS.attr('string'),
  /** file, metadata */
  type: DS.attr('string'),
  /** modified, changeRequested */
  status: DS.attr('string'),
  details: DS.attr('string')
});
