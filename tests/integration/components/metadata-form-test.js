import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  triggerEvent,
  findAll,
  settled,
  waitFor,
  click
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { run } from '@ember/runloop';
import { setupAnimationTest, time } from 'ember-animated/test-support';

module('Integration | Component | metadata-form', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);
  setupAnimationTest(hooks);

  let author,
      contact,
      grant,
      metadata,
      publication;

  hooks.beforeEach(function() {
    author = this.server.create('author');
    contact = this.server.create('contact');
    grant = this.server.create('grant');
    publication = this.server.create('publication');
    metadata = this.server.create('metadata', {
      authors: [author],
      contacts: [contact],
      grants: [grant],
      publications: [publication],
    });
  });

  hooks.afterEach(function() {
    return settled().then(() => {
      run(() => {
        if (this.store) {
          this.store.unloadAll();
        }
      });
    });
  });

  test('it renders the metadata form', async function(assert) {
    let storeMetadata = await this.owner.lookup('service:store').findRecord('metadata', metadata.id);

    this.set('metadata', storeMetadata);

    await render(hbs`<MetadataForm @metadata={{this.metadata}} />`);

    assert.dom('[data-test-detail-form]').isVisible();
    assert.dom('[data-test-author-form]').isVisible();
    assert.dom('[data-test-contact-form]').isVisible();
    assert.dom('[data-test-grant-form]').isVisible();
    assert.dom('[data-test-publication-form]').isVisible();
  });

  test('it validates the metadata form', async function(assert) {
    let storeMetadata = await this.owner.lookup('service:store').findRecord('metadata', metadata.id);

    this.set('metadata', storeMetadata);

    await render(hbs`<MetadataForm @metadata={{this.metadata}} />`);

    let forms = findAll('form');

    forms.forEach((form) => {
      triggerEvent(form, 'submit');
    });

    await waitFor('[data-test-collection-title-input]');
    assert.dom('[data-test-collection-title-input] div.invalid-feedback')
          .includesText(`Collection title can't be blank`);

    await waitFor('[data-test-author-name-input]');
    assert.dom('[data-test-author-name-input] div.invalid-feedback')
          .includesText(`Name can't be blank`);

    await waitFor('[data-test-contact-name-input]');
    assert.dom('[data-test-contact-name-input] div.invalid-feedback')
          .includesText(`Name can't be blank`);

    await waitFor('[data-test-grant-number-input]');
    assert.dom('[data-test-grant-number-input] div.invalid-feedback')
          .includesText(`Award number can't be blank`);

    await waitFor('[data-test-publication-doi-input]');
    assert.dom('[data-test-publication-doi-input] div.invalid-feedback')
          .includesText(`Doi can't be blank`);
  });

  test('it can add and delete authors', async function(assert) {
    let storeMetadata = await this.owner.lookup('service:store').findRecord('metadata', metadata.id);

    this.set('metadata', storeMetadata);

    await render(hbs`<MetadataForm @metadata={{this.metadata}} />`);

    await waitFor('[data-test-add-author-button]');
    await click('[data-test-add-author-button]');

    time.pause();
    await time.advance(350);
    await settled();

    let authorForms = findAll('[data-test-author-form]');
    assert.equal(authorForms.length, 2);

    await waitFor('[data-test-delete-author-button]');
    await click('[data-test-delete-author-button]');

    time.pause();
    await time.advance(350);
    await settled();

    authorForms = findAll('[data-test-author-form]');
    assert.equal(authorForms.length, 1);
  });

  test('it can add and delete contacts', async function(assert) {
    let storeMetadata = await this.owner.lookup('service:store').findRecord('metadata', metadata.id);

    this.set('metadata', storeMetadata);

    await render(hbs`<MetadataForm @metadata={{this.metadata}} />`);

    await waitFor('[data-test-add-contact-button]');
    await click('[data-test-add-contact-button]');

    time.pause();
    await time.advance(350);
    await settled();

    let contactForms = findAll('[data-test-contact-form]');
    assert.equal(contactForms.length, 2);

    await waitFor('[data-test-delete-contact-button]');
    await click('[data-test-delete-contact-button]');

    time.pause();
    await time.advance(350);
    await settled();

    contactForms = findAll('[data-test-contact-form]');
    assert.equal(contactForms.length, 1);
  });

  test('it can add and delete grants', async function(assert) {
    let storeMetadata = await this.owner.lookup('service:store').findRecord('metadata', metadata.id);

    this.set('metadata', storeMetadata);

    await render(hbs`<MetadataForm @metadata={{this.metadata}} />`);

    await waitFor('[data-test-add-grant-button]');
    await click('[data-test-add-grant-button]');

    time.pause();
    await time.advance(350);
    await settled();

    let grantForms = findAll('[data-test-grant-form]');
    assert.equal(grantForms.length, 2);

    await waitFor('[data-test-delete-grant-button]');
    await click('[data-test-delete-grant-button]');

    time.pause();
    await time.advance(350);
    await settled();

    grantForms = findAll('[data-test-grant-form]');
    assert.equal(grantForms.length, 1);
  });

  test('it can add and delete publications', async function(assert) {
    let storeMetadata = await this.owner.lookup('service:store').findRecord('metadata', metadata.id);

    this.set('metadata', storeMetadata);

    await render(hbs`<MetadataForm @metadata={{this.metadata}} />`);

    await waitFor('[data-test-add-publication-button]');
    await click('[data-test-add-publication-button]');

    time.pause();
    await time.advance(350);
    await settled();

    let publicationForms = findAll('[data-test-publication-form]');
    assert.equal(publicationForms.length, 2);

    await waitFor('[data-test-delete-publication-button]');
    await click('[data-test-delete-publication-button]');

    time.pause();
    await time.advance(350);
    await settled();

    publicationForms = findAll('[data-test-publication-form]');
    assert.equal(publicationForms.length, 1);
  });
});
