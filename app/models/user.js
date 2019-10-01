import DS from 'ember-data';
const { Model } = DS;

/** ID is implicit */
export default Model.extend({
  displayName: DS.attr('string'),
  email: DS.attr('strings')
});
