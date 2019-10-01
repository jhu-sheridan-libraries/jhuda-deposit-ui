import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({

  displayName() {
    return faker.name.findName();
  },

  email() {
    return faker.internet.email();
  }

});
