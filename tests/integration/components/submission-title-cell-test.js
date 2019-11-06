import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | submission-title-cell', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('record', EmberObject.create({
      _metadataJson: { "title": "Moo" }
    }));
    await render(hbs`<SubmissionTitleCell @record={{record}} />`);

    const text = this.element.textContent.trim();
    assert.equal(text, 'Moo');
  });

  test('Check display when no title exists', async function (assert) {
    this.set('record', EmberObject.create({
      _metadataJson: {}
    }));
    await render(hbs`<SubmissionTitleCell @record={{record}} />`);

    const text = this.element.textContent.trim();
    assert.equal(text, 'Click for details');
  });
});
