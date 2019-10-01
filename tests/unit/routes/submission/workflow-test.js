import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | submission/workflow', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:submission/workflow');
    assert.ok(route);
  });
});
