import { validatePresence } from 'ember-changeset-validations/validators';

export default {
  awardNumber: validatePresence(true),
  projectName: validatePresence(true),
  fundingAgency: validatePresence(true),
};
