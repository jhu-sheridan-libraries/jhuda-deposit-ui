import { validatePresence } from 'ember-changeset-validations/validators';

export default {
  collectionTitle: validatePresence(true),
};
