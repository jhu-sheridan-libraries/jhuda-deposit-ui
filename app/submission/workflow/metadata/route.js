import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { A } from '@ember/array';
import faker from 'faker';

export default Route.extend({
  async model() {
    let submission = await this.modelFor('submission.workflow').submission;
    let metadata = await get(submission, 'metadataModel');

    if (metadata) return metadata;

    let authors = A([this.store.createRecord('author', { id: faker.random.uuid() })]);
    let grants = A([this.store.createRecord('grant', { id: faker.random.uuid() })]);
    let publications = A([this.store.createRecord('publication', { id: faker.random.uuid() })]);
    let contacts = A([this.store.createRecord('contact', { id: faker.random.uuid() })]);

    metadata = this.store.createRecord('metadata', {
      authors,
      grants,
      publications,
      contacts,
      submission,
    });

    return metadata;
  }
});
