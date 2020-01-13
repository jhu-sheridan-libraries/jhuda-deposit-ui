import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import defaultScenario from '../../../mirage/scenarios/default';
import { A } from '@ember/array';
import { get } from '@ember/object';

module('Unit | Serializer | submission', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it serializes metadata records into a metadata string', function(assert) {

    let metadataString = '{"collectionTitle":"Submission completed by someone else","description":"A nice description","dataUse":"Please do not use the data in that way","softwareUse":"Please use the software in this way","authors":[{"name":"moo","affiliation":"JHU","id":"bf0cf1df-2929-404b-b7fe-99638a57bd4c"}],"contacts":[{"name":"Bessie Holstein","email":"besstein@cow.edu","id":"97332059-74e0-4aa2-aa52-f89fd3fb6168"}],"grants":[{"awardNumber":"2342321","projectName":"A nice project","fundingAgency":"An Agency","id":"f30201e1-4d05-48ea-b381-ce6301447b30"}],"publications":[{"doi":"12321213.12AGC","title":"A title","id":"f74b741a-20b9-43ec-b2ee-5fec17111894"}]}';
    let store = this.owner.lookup('service:store');
    let submission = store.createRecord('submission', {
      metadata: "",
    });

    let authors = A([store.createRecord('author', {
      "id": "bf0cf1df-2929-404b-b7fe-99638a57bd4c",
      "name": "moo",
      "affiliation": "JHU"
    })]);

    let grants = A([store.createRecord('grant', {
      "id": "f30201e1-4d05-48ea-b381-ce6301447b30",
      "awardNumber": "2342321",
      "projectName": "A nice project",
      "fundingAgency": "An Agency"
    })]);

    let publications = A([store.createRecord('publication', {
      "id": "f74b741a-20b9-43ec-b2ee-5fec17111894",
      "doi": "12321213.12AGC",
      "title": "A title"
    })]);

    let contacts = A([store.createRecord('contact', {
      "id": "97332059-74e0-4aa2-aa52-f89fd3fb6168",
      "name": "Bessie Holstein",
      "email": "besstein@cow.edu"
    })]);

    store.createRecord('metadata', {
      "collectionTitle": "Submission completed by someone else",
      "description": "A nice description",
      "softwareUse": "Please use the software in this way",
      "dataUse": "Please do not use the data in that way",
      "keywords": "",
      authors,
      grants,
      publications,
      contacts,
      submission,
    });

    let serializedRecord = submission.serialize();

    assert.equal(serializedRecord.metadata, metadataString);
  });

  test('it normalizes a submission payload with metadata into records', async function(assert) {
    defaultScenario(this.server);
    let store = this.owner.lookup('service:store');
    await store.query('submission', { user: '1' }, { include: 'files' });
    let submission = store.peekRecord('submission', 'https://archive.local/fcrepo/rest/submissions/23/07/cf/c1/2307cfc1-5d0f-416f-9f0e-c8ea43d1fccd');
    let metadata = await get(submission, 'metadataModel');
    let authors = await get(metadata, 'authors');
    let grants = await get(metadata, 'grants');
    let publications = await get(metadata, 'publications');
    let contacts = await get(metadata, 'contacts');

    assert.equal(metadata.collectionTitle, 'Submission completed by someone else');
    assert.equal(authors.toArray()[0].name, 'moo');
    assert.equal(grants.toArray()[0].awardNumber, '2342321');
    assert.equal(publications.toArray()[0].doi, '12321213.12AGC');
    assert.equal(contacts.toArray()[0].name, 'Bessie Holstein');
  });
});
