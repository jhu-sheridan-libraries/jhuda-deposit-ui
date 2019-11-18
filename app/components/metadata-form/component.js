import Component from '@glimmer/component';
import MetadataValidations from '../../validations/metadata';
import AuthorValidations from '../../validations/author';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MetadataFormComponent extends Component {
  @service store;

  MetadataValidations = MetadataValidations;
  AuthorValidations = AuthorValidations;


  @action
  saveMetadata(formData) {
    formData.save();
    return true;
  }

  @action
  saveAuthor(formData) {
    formData.save();

    return true;
  }

  @action
  addAuthor() {
    this.store.createRecord('author', {
      name: '',
      affiliation: '',
      metadata: this.args.metadata
    });
  }

  @action
  removeAuthor(author) {
    author.deleteRecord();
  }
}
