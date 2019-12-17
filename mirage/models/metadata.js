import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  authors: hasMany(),
  contacts: hasMany(),
  grants: hasMany(),
  publications: hasMany(),
});
