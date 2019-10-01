import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  externalId: () => faker.system.filePath(),
  description: () => faker.lorem.sentences(3),
  status: () => 'uploading',

  isScanning: trait({ status: 'scanning' }),
  changesRequired: trait({ status: 'changesRequired' }),
  isAccepted: trait({ status: 'accepted' })
});
