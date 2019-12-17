import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  affiliation: DS.attr('string'),
  metadata: DS.belongsTo('metadata')
});
