import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Controller | submission/details', function(hooks) {
  setupTest(hooks);

  test('Metadata display model looks OK', function (assert) {
    const metadata = {
      title: 'This is a moo',
      one: 'a value',
      cow: 'moo'
    };

    const controller = this.owner.lookup('controller:submission/details');
    controller.set('model', EmberObject.create({
      _metadataJson: metadata
    }));

    const md = controller.mdDisplay;

    assert.ok(md);
    assert.equal(3, md.length);
    assert.deepEqual({ label: 'cow', value: 'moo' }, md[2]);
  });
});
