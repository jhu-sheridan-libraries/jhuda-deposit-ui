import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | jhuda-status', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('status', { label: 'Moo', description: 'Moo Description', class: 'moo-class' });
    await render(hbs`<JhudaStatus @status={{status}} />`);

    assert.dom('i.fa-info-circle').exists();
    assert.dom('span.moo-class').exists();
    assert.dom('span').hasText('Moo');
  });
});
