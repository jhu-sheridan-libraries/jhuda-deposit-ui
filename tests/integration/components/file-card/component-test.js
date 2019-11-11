import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject, { set } from '@ember/object';
import { A } from '@ember/array';

module('Integration | Component | file-card', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    const file = EmberObject.create({
      name: 'ThisIsAFile.moo',
      description: 'The cows graze in the sun happily',
      status: 'moo'
    });

    set(this, 'fileGrp', {
      file
    });
  });

  test('Component displays file name, description, status, and required action message', async function (assert) {
    set(this, 'fileGrp', {
      ...this.fileGrp,
      hasActions: true,
      actions: A([
        EmberObject.create({ type: 'file', key: 'ThisIsAFile.moo', details: 'Your Moo needs a little somethin' })
      ])
    });
    await render(hbs`<FileCard @fileGrp={{fileGrp}}/>`);

    assert.dom('.card').includesText('The cows graze in the sun happily');
    assert.dom('.card').includesText('ThisIsAFile.moo');
    assert.dom('.card').includesText('Status: moo');
    assert.dom('.card').includesText('Your Moo needs');
  });

  test('Clicking "Show" button should let a user edit the description', async function (assert) {
    set(this, 'editAction', () => {});

    await render(hbs`<FileCard @fileGrp={{fileGrp}} @editAction={{editAction}} />`);

    assert.dom('[data-test-file-edit-btn]').exists();
    await click('[data-test-file-edit-btn]');

    assert.dom('[data-test-description-editor]').exists();
  });

  test('Editing description changes description on File', async function (assert) {
    set(this, 'editAction', () => {});

    await render(hbs`<FileCard @fileGrp={{fileGrp}} @editAction={{editAction}} />`);
    await click('[data-test-file-edit-btn]');

    await fillIn('[data-test-description-editor]', 'The hip new moo');

    await click('[data-test-save-filedesc-btn]');

    const file = this.fileGrp.file;
    assert.equal(file.description, 'The hip new moo');
  });
});
