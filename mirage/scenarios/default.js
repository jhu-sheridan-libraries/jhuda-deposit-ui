import files from '../custom-fixtures/files';
import subActions from '../custom-fixtures/submission-actions';
import submissions from '../custom-fixtures/submissions';

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
