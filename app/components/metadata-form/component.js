import Component from '@glimmer/component';
import MetadataValidations from '../../validations/metadata';
import AuthorValidations from '../../validations/author';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset/utils/validator-lookup';
import { A } from '@ember/array';

export default class MetadataFormComponent extends Component {
  @service store;

  constructor() {
    super(...arguments);

    this.metadataChangeset = new Changeset(this.args.metadata, lookupValidator(MetadataValidations), MetadataValidations);

    this.authorChangesets = this.args.metadata.authors.toArray().map((author) => {
      return new Changeset(author, lookupValidator(AuthorValidations), AuthorValidations);
    });

    this.allChangesets = A();
    this.allChangesets.pushObject(this.metadataChangeset);
    this.allChangesets.pushObjects(this.authorChangesets);
  }

  @action
  async saveMetadata() {
    let forms = document.querySelectorAll('form');
    let event = document.createEvent('Events');
    event.initEvent('submit', true, true);
    forms.forEach((form) => {
      form.dispatchEvent(event);
    });

    for(const set of this.allChangesets) {
      await set.validate();
    }
    if (this.allChangesets.isEvery('isValid')) {
      this.allChangesets.forEach((changeset) => changeset.execute());
    }

    return true;
  }

  @action
  addAuthor() {
    let author = this.store.createRecord('author', {
      name: null,
      affiliation: null,
      metadata: this.args.metadata
    });
    let authorChangeset = new Changeset(author, lookupValidator(AuthorValidations), AuthorValidations);
    this.authorChangesets.pushObject(authorChangeset);
    this.allChangesets.pushObject(authorChangeset);
  }

  @action
  removeAuthor(authorChangeset, index) {
    let author = authorChangeset._content;
    this.authorChangesets.removeAt(index);
    author.deleteRecord();
  }

  @action
  addGrant() {
    let grant = this.store.createRecord('grant', {
      name: null,
      affiliation: null,
      metadata: this.args.metadata
    });
    let authorChangeset = new Changeset(author, lookupValidator(AuthorValidations), AuthorValidations);
    this.authorChangesets.pushObject(authorChangeset);
    this.allChangesets.pushObject(authorChangeset);
  }

  @action
  removeGrant(authorChangeset, index) {
    let author = authorChangeset._content;
    this.authorChangesets.removeAt(index);
    author.deleteRecord();
  }

  @action
  updateName(event) {
// debugger;
  }
}
