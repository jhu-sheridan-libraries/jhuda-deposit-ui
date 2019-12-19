import ENV from 'jhu-deposit-ui/config/environment';
import FedoraJsonLdAdapter from 'jhu-deposit-ui/adapters/fedora-jsonld';

// export default class FedoraAdapter extends FedoraJsonLdAdapter {
//   baseURI = ENV.fedora.base;
//   elasticsearchURI = ENV.fedora.elasticsearch;
//   username = ENV.fedora.username;
//   password = ENV.fedora.password;
// }

export default FedoraJsonLdAdapter.extend({
  baseURI: ENV.fedora.base,
  elasticsearchURI: ENV.fedora.elasticsearch,
  username: ENV.fedora.username,
  password: ENV.fedora.password
});