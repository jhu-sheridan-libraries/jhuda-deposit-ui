import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

module('Integration | Component | onedrive-file-picker', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<OnedriveFilePicker />`);

    assert.dom('button').exists();
    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`<OnedriveFilePicker>Pick file(s) from OneDrive</OnedriveFilePicker>`);

    assert.dom('button').exists();
    assert.dom('button').hasText('Pick file(s) from OneDrive');
  });

  test('Clicking invokes launches file picker from service', async function (assert) {
    assert.expect(2);

    this.owner.register('service:onedrive', Service.extend({
      launchFilePicker() {
        assert.ok(true);
      }
    }));

    await render(hbs`<OnedriveFilePicker @appId="moo"/>`);

    assert.dom('button').exists();
    // Component should invoke OnedriveService#launchFilePicker when clicked
    await click('button');
  });
});
