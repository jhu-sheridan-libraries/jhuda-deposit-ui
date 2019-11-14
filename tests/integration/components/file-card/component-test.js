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
    await render(hbs`<FileCard @fileGrp={{this.fileGrp}}/>`);

    assert.dom('[data-test-file-card]').includesText('The cows graze in the sun happily');
    assert.dom('[data-test-file-card]').includesText('ThisIsAFile.moo');
    assert.dom('[data-test-file-card-status]').includesText('moo');
    assert.dom('[data-test-action-messages]').includesText('Your Moo needs');
  });

  test('Clicking "Show" button should let a user edit the description', async function (assert) {
    set(this, 'editable', true);

    await render(hbs`<FileCard @fileGrp={{this.fileGrp}} @editable={{this.editable}}/>`);

    assert.dom('[data-test-file-edit-btn]').exists();
    await click('[data-test-file-edit-btn]');

    assert.dom('[data-test-description-editor]').exists();
  });

  test('Editing description saves the new description', async function (assert) {
    assert.expect(1);

    set(this, 'fileGrp', EmberObject.create({
      file: EmberObject.create({
        name: 'FileWithASave.moo',
        description: 'The cows graze in the sun',
        save: () => {
          assert.ok(true);
        }
      })
    }));
    set(this, 'editable', true);

    await render(hbs`<FileCard @fileGrp={{this.fileGrp}} @editable={{this.editable}} />`);
    await click('[data-test-file-edit-btn]');

    await fillIn('[data-test-description-editor]', 'The hip new moo');

    await click('[data-test-save-filedesc-btn]');
    // const file = this.fileGrp.file;
    // assert.equal(file.description, 'The hip new moo');
  });
});
