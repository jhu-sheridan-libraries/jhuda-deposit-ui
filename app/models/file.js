import DS from 'ember-data';
const { Model, attr } = DS;

export default class File extends Model {
  @attr('string') name;
  @attr('string') origin; // upload, onedrive
  @attr('string') externalId;
  @attr('string') description;
  @attr('string') status; // processing, changesRequired, accepted, published
  @attr('string') downloadUrl;
  @attr('string') externalPath;
  @attr('string') checksum;
  @attr('string') checksumFunction;
  @attr('number') size;
  @attr('string') location;
}
