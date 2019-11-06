import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | files-status-cell', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('submission', EmberObject.create({
      filesStatus: 'processing'
    }));
  });

  test('it renders', async function(assert) {
    await render(hbs`<FilesStatusCell @record={{submission}}/>`);
    assert.equal(this.element.textContent.trim(), 'Processing');
  });
});
