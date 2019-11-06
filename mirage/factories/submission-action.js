import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  isMetadata: trait({ type: 'metadata' }),
  isFile: trait({ type: 'file' }),

  badFile: trait({
    key: 'file1',
    type: 'file',
    status: 'changeRequested',
    details: faker.lorem.sentence
  }),

  isModified: trait({
    key: 'one',
    status: 'modified',
    details: faker.lorem.sentence
  }),
  metadataChangeRequested: trait({
    key: 'one',
    status: 'changeRequested',
    details: faker.lorem.sentence
  })
});
