import ENV from 'jhu-deposit-ui/config/environment';
import FedoraJsonLdSerializer from 'jhu-deposit-ui/serializers/fedora-jsonld';

export default FedoraJsonLdSerializer.extend({
  contextURI: ENV.fedora.context,
  dataURI: ENV.fedora.data
});