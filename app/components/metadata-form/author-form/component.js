import Component from '@glimmer/component';
import { action } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset/utils/validator-lookup';
import AuthorValidations from '../../../validations/author';
import { inject as service } from '@ember/service';
import fade from 'ember-animated/transitions/fade';

export default class MetadataFormAuthorFormComponent extends Component {
  @service store;

  transition = fade;

  /**
   * a noop that is needed for the @onSubmit property of the ember-bootstrap form API
   * which we are not utilizing because we need to collect all the changesets
   * and validate/execute changes manually as ember-bootstrap forms can only
   * safely handle one model per form at this time.
   */
  @action
  noop() {}

  @action
  addAuthor() {
    let author = this.store.createRecord('author', {
      metadata: this.args.metadata
    });

    let authorChangeset = new Changeset(author, lookupValidator(AuthorValidations), AuthorValidations);

    this.args.authorChangesets.pushObject(authorChangeset);
  }

  @action
  removeAuthor(authorChangeset, index) {
    let author = authorChangeset._content;

    this.args.authorChangesets.removeAt(index);
    author.deleteRecord();
  }
}
