import ENV from 'jhu-deposit-ui/config/environment';
import ES from './routes/elastic-search';
import files from './routes/files';
import submissions from './routes/submissions';
import subActions from './routes/submission-actions';

export default function() {
  this.urlPrefix = ENV.host;

  ES(this);
  files(this);
  submissions(this);
  subActions(this);

  this.passthrough();
  this.passthrough(`${ENV.fedora.base}**`);
  this.passthrough(`${ENV.fedora.base}`.replace('_search', '_stats/index'));
}
