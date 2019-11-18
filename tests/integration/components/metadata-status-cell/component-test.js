import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | metadata-status-cell', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('record', EmberObject.create({
      metadataStatus: 'requiresAction'
    }));

    await render(hbs`<MetadataStatusCell @record={{record}} />`);
    assert.dom('span.text-danger').hasText('Requires Action');
  });
});
