import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject, { set } from '@ember/object';
import { A } from '@ember/array';

module('Integration | Component | submission-title-cell', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    set(this, 'record', EmberObject.create({
      _metadataJson: { "title": "Moo" }
    }));
    await render(hbs`<SubmissionTitleCell @record={{record}} />`);

    const text = this.element.textContent.trim();
    assert.equal(text, 'Moo');
  });

  test('Check display when no title exists', async function (assert) {
    set(this, 'record', EmberObject.create({
      _metadataJson: {}
    }));
    await render(hbs`<SubmissionTitleCell @record={{record}} />`);

    const text = this.element.textContent.trim();
    assert.equal(text, 'Click for details');
  });

  test('Required actions for submission are displayed', async function (assert) {
    set(this, 'record', EmberObject.create({
      _metadataJson: { 'title': 'Moo title' },
      requiredActions: A([
        EmberObject.create({ key: 'moo', details: 'Moo message' }),
        EmberObject.create({ key: 'title', details: 'Should be "Title Moo"' })
      ])
    }));

    await render(hbs`<SubmissionTitleCell @record={{record}} />`);

    assert.dom('[data-test-sub-messages]').includesText('Moo message');
    assert.dom('[data-test-sub-messages]').includesText('Should be "Title Moo"');
  });
});
