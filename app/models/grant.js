import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  awardNumber: DS.attr('string'),
  projectName: DS.attr('string'),
  fundingAgency: DS.attr('string'),
  metadata: DS.belongsTo('metadata')
});
