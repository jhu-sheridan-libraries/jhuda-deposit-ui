import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | submission-status-display', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // await render(hbs`<SubmissionStatusDisplay />`);
    // assert.equal(this.element.textContent.trim(), '');

    this.set('record', EmberObject.create({ status: 'requiresAction' }));
    await render(hbs`<SubmissionStatusDisplay @record={{record}} />`);

    assert.dom('span.text-danger').exists();
    assert.dom('span').hasText('Requires Action');
  });
});
