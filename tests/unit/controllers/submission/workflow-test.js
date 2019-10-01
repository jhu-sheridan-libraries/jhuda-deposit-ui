import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Controller | submission/workflow', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:submission/workflow');
    assert.ok(controller);
  });

  test('Next action triggers transition', function (assert) {
    assert.expect(1);

    const controller = this.owner.lookup('controller:submission/workflow');

    controller.set('router', EmberObject.create({
      currentRouteName: 'submission.workflow.agreements'
    }));
    controller.set('transitionToRoute', (route) => {
      assert.equal('submission.workflow.metadata', route, 'Unexpected route name found in transition');
    });

    controller.send('next');
  });

  test('Next doesn\'t run past workflow steps', function (assert) {
    assert.expect(0);

    const controller = this.owner.lookup('controller:submission/workflow');

    controller.set('router', EmberObject.create({
      currentRouteName: 'submission.workflow.files'
    }));
    controller.set('transitionToRoute', (route) => { assert.ok(route); });

    controller.send('next');
  });

  test('Back should navigate to a previous step', function (assert) {
    assert.expect(1);

    const controller = this.owner.lookup('controller:submission/workflow');

    controller.set('router', EmberObject.create({
      currentRouteName: 'submission.workflow.metadata'
    }));
    controller.set('transitionToRoute', (route) => {
      assert.equal('submission.workflow.agreements', route, 'Unexpected route name found in transition');
    });

    controller.send('back');
  });

  test('Back should do nothing if already at the first step', function (assert) {
    assert.expect(0);

    const controller = this.owner.lookup('controller:submission/workflow');

    controller.set('router', EmberObject.create({
      currentRouteName: 'submission.workflow.agreements'
    }));
    controller.set('transitionToRoute', (route) => { assert.ok(route); });

    controller.send('back');
  });
});
