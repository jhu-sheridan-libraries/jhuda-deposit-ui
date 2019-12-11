import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  collectionTitle: DS.attr('string'),
  description: DS.attr('string'),
  keywords: DS.attr('string'),
  contactName: DS.attr('string'),
  contactEmail: DS.attr('string'),
  dataUse: DS.attr('string'),
  softwareUse: DS.attr('string'),

  grants: DS.hasMany('grant'),
  authors: DS.hasMany('author'),
  contacts: DS.hasMany('contact'),
  publications: DS.hasMany('publication'),

  submission: DS.belongsTo('submission'),
});
