import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  doi: DS.attr('string'),
  title: DS.attr('string'),
  metadata: DS.belongsTo('metadata')
});
