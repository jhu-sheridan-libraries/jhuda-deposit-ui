import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { A } from '@ember/array';

export default Route.extend({
  async model() {
    let submission = await this.modelFor('submission.workflow').submission;
    let metadata = await get(submission, 'metadataModel');

    if (metadata) return metadata;

    let authors = A([await this.store.createRecord('author')]);
    let grants = A([await this.store.createRecord('grant')]);
    let publications = A([await this.store.createRecord('publication')]);
    let contacts = A([await this.store.createRecord('contact')]);

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
