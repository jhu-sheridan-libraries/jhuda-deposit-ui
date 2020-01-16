/* eslint-disable no-global-assign */
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get, set } from '@ember/object';

module('Unit | Service | onedrive', function(hooks) {
  setupTest(hooks);

  /*
    Example test data:
      * We need a top level object which contains both files and folders
      * Make child object one contain only files
      * Make child object two contain both files and a folder
        * Sub-folder should contain only files
  */
  const user = {
    email: 'bessie@moo.com',
    id: '<moo-id>',
    displayName: 'Moo Jones'
  };
  const top_children = [
    {
      id: '<folder1-id>',
      name: 'folder1',
      createdBy: { user },
      lastModifiedBy: { user },
      folder: { childCount: 2 }
    },
    {
      id: '<folder2-id>',
      name: 'folder2',
      createdBy: { user },
      lastModifiedBy: { user },
      folder: { childCount: 3 }
    },
    {
      id: '<file1-id>',
      name: 'file1',
      createdBy: { user },
      lastModifiedBy: { user },
      size: 1234,
      file: {
        mimeType: 'text/plain',
        hashes: { quickXorHash: 'aspdoifjqw' }
      }
    },
    {
      id: '<file2-id>',
      name: 'file2',
      createdBy: { user },
      lastModifiedBy: { user },
      size: 1234,
      file: {
        mimeType: 'text/plain',
        hashes: { quickXorHash: 'jfijieoijfoe232r' }
      }
    }
  ];
  const dir1_children = [
    {
      id: '<moo/file11>',
      name: 'file11',
      createdBy: { user },
      lastModifiedBy: { user },
      size: 4312,
      file: {
        mimeType: 'text/xml',
        hashes: { quickXorHash: 'jofj8120384fjasld' }
      }
    },
    {
      id: '<moo/file12>',
      name: 'file12',
      createdBy: { user },
      lastModifiedBy: { user },
      size: 10289,
      file: {
        mimeType: 'text/xml',
        hashes: { quickXorHash: 'jf19082jf09a8f' }
      }
    }
  ];
  const dir2_children = [
    {
      id: '<moo/dir2/dir2_1>',
      name: 'dir2_1',
      createdBy: { user },
      lastModifiedBy: { user },
      folder: { childCount: 2 }
    },
    {
      id: '<moo/dir2/file21>',
      name: 'file21',
      createdBy: { user },
      lastModifiedBy: { user },
      size: 12,
      file: {
        mimeType: 'text/html',
        hashes: { quickXorHash: 'jf012j34f1f' }
      }
    },
    {
      id: '<moo/dir2/file22>',
      name: 'file22',
      createdBy: { user },
      lastModifiedBy: { user },
      file: {
        mimeType: 'text/css',
        hashes: { quickXorHash: 'jf1024j-f01j40f' }
      }
    }
  ];
  const dir2_1_children = [
    {
      id: '<moo/dir2/dir2_1/file211>',
      name: 'file211',
      createdBy: { user },
      lastModifiedBy: { user },
      file: {
        mimeType: 'text/html',
        hashes: { quickXorHash: 'jf092je0f9j90fj' }
      }
    },
    {
      id: '<moo/dir2/dir2_1/file212>',
      name: 'file212',
      createdBy: { user },
      lastModifiedBy: { user },
      file: {
        mimeType: 'text/html',
        hashes: { quickXorHash: 'jf01j890jak92asdqwerq' }
      }
    }
  ];
  const top = {
    accessToken: 'tokenize:moo',
    apiEndpoint: 'https://example.com/moo-point',
    value: top_children
  };
  const dir1_resp = {
    accessToken: 'tokenize:moo:dir1',
    apiEndpoint: 'https://example.com/moo-point',
    value: dir1_children
  };
  const dir2_resp = {
    accessToken: 'tokenize:moo',
    apiEndpoint: 'https://example.com/moo-point',
    value: dir2_children
  };
  const dir2_1_resp = {
    accessToken: 'tokenize:moo',
    apiEndpoint: 'https://example.com/moo-point',
    value: dir2_1_children
  };

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

    const result = await service._getFilesInFolder(start, get(this, 'startOpts'), true);

    assert.ok(Array.isArray(result), 'Result needs to be an array');
    assert.equal(result.length, 4, 'Unexpected number of elements found in result');
  });
});
