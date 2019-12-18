import { validatePresence } from 'ember-changeset-validations/validators';

export default {
  doi: validatePresence(true),
  title: validatePresence(true)
};
