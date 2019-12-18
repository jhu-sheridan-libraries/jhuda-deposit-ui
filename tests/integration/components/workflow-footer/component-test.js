import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | workflow-footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('cancel', () => {
      assert.ok(true);
    });
    this.set('back', () => {
      assert.ok(true);
    });
    this.set('next', () => {
      assert.ok(true);
    });

    await render(hbs`<WorkflowFooter
                      @cancel={{this.cancel}}
                      @back={{this.back}}
                      @next={{this.next}} />`);

    assert.equal(this.element.textContent.trim(), 'Cancel\n    \n    \n      Back\n      Next');
  });
});
