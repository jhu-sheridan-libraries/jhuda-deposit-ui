import FedoraJsonLdSerializer from 'jhu-deposit-ui/serializers/fedora-jsonld';
import { singularize } from 'ember-inflector';
import faker from 'faker';
import { get } from '@ember/object';

export default class SubmissionSerializer extends
FedoraJsonLdSerializer.extend() {

  constructor() {
    super(...arguments);
  }

  /**
    An override of the Fedora JSON-LD Serializer normalize method that
    does work specific to normalizing the metadata string into Ember Data
    backed models.
    @method normalize
    @param {DS.Model} typeClass
    @param {Object} hash
    @return {Object}
  */
  normalize(typeClass, hash) {
    let parentNormalization = super.normalize(typeClass, hash);
    let obj = hash.metadata ? JSON.parse(hash.metadata) : {};
    let metadata = this._setupMetadataModel(obj);

    this._setupMetadataRelatedModels(obj, metadata);

    if (hash.metadata != null) {
      parentNormalization.relationships.metadataModel = {
        data: {
          id: metadata.id,
          type: 'metadata'
        }
      };
    }

    return parentNormalization;
  }

  /**
   * Create Ember Data backed metadata model
   * @param {Object} obj
   * @returns {DS.Model}: the Ember Data representation of the top-level metadata fields
   */
  _setupMetadataModel(obj) {
    return this.store.createRecord('metadata', {
      id: faker.random.uuid(),
      collectionTitle: obj.collectionTitle,
      description: obj.description,
      keywords: obj.keywords,
      contactName: obj.contactName,
      contactEmail: obj.contactEmail,
      dataUse: obj.dataUse,
      softwareUse: obj.softwareUse,
    });
  }

  /**
   * Create related Ember Data backed metadata models and establish relationships
   * @param {Object} obj
   * @param {DS.Model} metadata
   */
  _setupMetadataRelatedModels(obj, metadata) {
    [
      'authors',
      'contacts',
      'grants',
      'publications',
    ].forEach(type => {
      let records = obj[type];

      if (records) {
        records.forEach(record => {
          record.metadata = metadata;
          this.store.createRecord(singularize(type), record);
        });
      }
    });
  }

   /**
    An override of the Fedora JSON-LD Serializer serialize method that
    does work specific to serializing the metadata and related Ember Data
    backed models into a stringified JSON object on the submission
    JSON-LD payload being returned to fedora
    @method serialize
    @param {DS.Snapshot} snapshot
    @param {Object} [options]
    @return {Object}
  */
  serialize(snapshot, options) {
    let parentSerialization = super.serialize(snapshot, options);

    let obj = {};
    let metadataModel = snapshot.record.get('metadataModel.content');

    if (metadataModel) {
      metadataModel.eachAttribute((key) => {
        let metadata = get(snapshot, 'record.metadataModel.content');

        if (metadata[key]) {
          obj[key] = get(metadata, key);
        }
      });

      [
        'authors',
        'contacts',
        'grants',
        'publications',
      ].forEach(type => {
        let metadata = get(snapshot, 'record.metadataModel.content');
        let records = get(metadata, type);

        if (records) {
          records.forEach(record => {
            let attrs = {};

            record.eachAttribute((key) => {
              if (record[key]) {
                attrs[key] = get(record, key);
              }
            });

            attrs.id = record.id;

            obj[type] = [];

            obj[type].pushObject(attrs);
          });
        }
      });

      parentSerialization['metadata'] = JSON.stringify(obj);
    }

    return parentSerialization;
  }
}
