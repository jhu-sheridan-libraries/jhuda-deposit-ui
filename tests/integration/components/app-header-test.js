import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | app-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AppHeader />`);

    assert.ok(this.element.textContent.includes('Dashboard'));

    // Template block usage:
    await render(hbs`
      <AppHeader>
        template block text
      </AppHeader>
    `);

    assert.ok(this.element.textContent.trim().includes('template block text'));
  });
});
