import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import Service from '@ember/service';

module('Integration | Component | submission-action-cell', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<SubmissionActionCell />`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('Buttons show up for draft submissions', async function (assert) {
    const record = EmberObject.create({ status: 'draft' });
    this.set('record', record);
    await render(hbs`<SubmissionActionCell @record={{record}} />`);

    assert.dom('i.fa-edit').exists();
    assert.dom('i.fa-trash-alt').exists();
  });

  test('Make sure "delete" deletes and transitions', async function (assert) {
    assert.expect(2);

    this.owner.register('service:router', Service.extend({
      transitionTo: () => { assert.ok(true); }
    }));

    const record = EmberObject.create({
      status: 'draft',
      destroyRecord: () => { assert.ok(true); }
    });
    this.set('record', record);
    await render(hbs`<SubmissionActionCell @record={{record}} />`);

    await click('[data-test-delete-btn]');
  });
});
