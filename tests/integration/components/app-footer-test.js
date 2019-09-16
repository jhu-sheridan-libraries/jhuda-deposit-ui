import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | app-footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AppFooter />`);

    assert.ok(this.element.textContent.includes('Contact us'));

    // Template block usage:
    await render(hbs`
      <AppFooter>
        template block text
      </AppFooter>
    `);

    assert.ok(this.element.textContent.trim().includes('template block text'));
  });
});
