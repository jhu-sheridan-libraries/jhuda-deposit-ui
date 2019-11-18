import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  collectionTitle: DS.attr('string'),
  description: DS.attr('string'),
  keywords: DS.attr('string'),
  contactName: DS.attr('string'),
  contactEmail: DS.attr('string'),
  grants: DS.hasMany('grant'),
  authors: DS.hasMany('author')
});
