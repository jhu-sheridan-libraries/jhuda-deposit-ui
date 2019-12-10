import files from '../fixtures/files';
import subActions from '../fixtures/submission-actions';
import submissions from '../fixtures/submissions';

export default function(server) {
  // server.loadFixtures();
  files.forEach((file) => {
    server.create('file', { _source: file });
  });

  subActions.forEach((action) => {
    server.create('submission-action', { _source: action });
  });

  submissions.forEach((sub) => {
    server.create('submission', { _source: sub });
  });
}
