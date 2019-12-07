import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  async model() {
    let submission = await this.modelFor('submission.workflow').submission;
    let metadata = await get(submission, 'metadataModel');

    if (metadata) return metadata;

    let authors = [
      await this.store.createRecord('author'),
    ];

    let grants = [
      await this.store.createRecord('grant'),
    ];

    let publications = [
      await this.store.createRecord('publication'),
    ];

    let contacts = [
      await this.store.createRecord('contact'),
    ];

    metadata = await this.store.createRecord('metadata', {
      authors,
      grants,
      publications,
      contacts,
      submission,
    });

    return metadata;
  }
});
