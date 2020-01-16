/* eslint-disable no-global-assign */
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get, set } from '@ember/object';
import {
  top,
  top_children,
  dir1_resp,
  dir2_resp,
  dir2_1_resp
} from './onedrive-test-data';

module('Unit | Service | onedrive', function(hooks) {
  setupTest(hooks);

  const origFetch = fetch;

  hooks.beforeEach(function() {
    set(this, 'startOpts', { accessToken: 'moo', apiEndpoint: 'https://example.com/moo/' });

    const map = {
      '<folder1-id>': dir1_resp,
      '<folder2-id>': dir2_resp,
      '<moo/dir2/dir2_1>': dir2_1_resp,
    };

    fetch = (url) => Promise.resolve({
      ok: true,
      json() {
        const match = Object.keys(map).find((key) => url && url.includes(key));

        if (match) {
          return Promise.resolve(map[match]);
        }

        return Promise.resolve(top);
      }
    });
  });

  hooks.afterEach(function() {
    fetch = origFetch;
  });

  test('Make sure mock "fetch" looks OK', async function(assert) {
    let service = this.owner.lookup('service:onedrive');
    assert.ok(service);

    let result = await fetch('moo');
    let json = await result.json();

    assert.deepEqual(json, top);

    result = await fetch('https://example.com/<folder1-id>/children');
    json = await result.json();

    assert.deepEqual(json, dir1_resp);

    result = await fetch('https://example.com/<moo/dir2/dir2_1>/children');
    json = await result.json();

    assert.deepEqual(json, dir2_1_resp);
  });

  test('_getFilesInFolder recurses through child folders', async function (assert) {
    const service = this.owner.lookup('service:onedrive');
    const start = top_children[1];
    const result = await service._getFilesInFolder.perform(start, get(this, 'startOpts'), true);

    assert.ok(Array.isArray(result), 'Result needs to be an array');
    assert.equal(result.length, 4, 'Unexpected number of elements found in result');
  });

  test('_getFilesInFolder ignores folders if told not to follow', async function (assert) {
    const service = this.owner.lookup('service:onedrive');
    const start = top_children[1];
    const result = await service._getFilesInFolder.perform(start, get(this, 'startOpts'), false);

    assert.ok(Array.isArray(result));
    assert.equal(result.length, 2);
  });

  test('_process will get all files', async function (assert) {
    const service = this.owner.lookup('service:onedrive');
    const start = top;

    const resolve = function (files) {
      assert.ok(Array.isArray(files));
      assert.equal(files.length, 8);
    };

    await service._process.perform(start, true, resolve);
  });
});
