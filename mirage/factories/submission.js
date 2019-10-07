import { Factory, association, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  user: association(),

  accessUrl: undefined,
  status: () => 'draft',
  metadataStatus: 'na',
  filesStatus: 'na',
  metadata: '',

  /**
   * Use this trait for any submission that generically has files. If you need a submission
   * that has files with special status, such as a file with an associated 'submission-action'
   * then you should not use this and create a separate file list.
   */
  hasFiles: trait({
    afterCreate(submission, server) {
      if (submission.files.length === 0) {
        submission.update({ files: server.createList('file', 3) })
      }
    }
  }),
  hasMetadata: trait({
    metadata: `{"one":"moo","title": "${faker.lorem.sentence()}","${faker.lorem.word()}":"${faker.lorem.sentence()}"}`
  }),

  /**
   * Files are being uploaded to the system. File metadata exists for these Files objects
   */
  uploadingFiles: trait({
    filesStatus: 'uploading',
    metadataStatus: 'scanning'
  }),

  metadataNeedsApproval: trait({
    filesStatus: 'scanning',
    metadataStatus: 'requiresApproval',

    afterCreate(submission, server) {
      if (submission.requiredActions.length === 0) {
        submission.update({
          requiredActions: server.create('submission-action', 'isMetadata', 'isModified')
        });
      }
    }
  }),

  fileMustChange: trait({
    filesStatus: 'requiresChanges',
    metadataStatus: 'approved',

    afterCreate(submission, server) {
      const files = server.createList('file', 3);
      if (submission.files.length === 0) {
        submission.update({ files })
      }
      if (submission.requiredActions.length === 0) {
        submission.update({
          requiredActions: server.create('submission-action', 'isFile', { key: files[0].id })
        });
      }
    }
  }),

  randomMetadata: trait({
    metadata: function () {
      let md = { title: 'This submission has random metadata' };

      for (let i = 0; i < 15; i++) {
        md[faker.lorem.word()] = faker.lorem.sentence();
      }

      return JSON.stringify(md);
    }
  })
});
