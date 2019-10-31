import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

module('Integration | Component | files-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    const files = A([
      EmberObject.create({
        id: 'moo_1',
        name: 'File 1',
        status: 'moo'
      })
    ]);
    this.set('files', files);
  });

  /**
   * Edit/Remove buttons should only show if appropriate actions are provided to the component
   */
  test('No buttons appear when no actions are provided', async function (assert) {
    await render(hbs`<FilesList @files={{files}}/>`);

    assert.dom('[data-test-files-list]').exists();
    assert.dom('[data-test-files-list]').includesText('File 1');

    assert.dom('[data-test-file-remove-btn]').doesNotExist();
    assert.dom('[data-test-file-edit-btn]').doesNotExist();
  });

  test('Buttons appear when actions are provided', async function (assert) {
    const rm = () => {};
    const ed = () => {};

    this.set('rm', rm);
    this.set('ed', ed);

    await render(hbs`<FilesList @files={{files}} @removeAction={{rm}} @editAction={{ed}} />`);

    assert.dom('[data-test-files-list]').exists();
    assert.dom('[data-test-files-list]').includesText('File 1');

    assert.dom('[data-test-file-remove-btn]').exists();
    assert.dom('[data-test-file-edit-btn]').exists();
  });
});
