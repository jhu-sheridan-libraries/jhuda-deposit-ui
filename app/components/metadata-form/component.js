import Component from '@glimmer/component';
import MetadataValidations from 'jhu-deposit-ui/validations/metadata';
import AuthorValidations from 'jhu-deposit-ui/validations/author';
import GrantValidations from 'jhu-deposit-ui/validations/grant';
import PublicationValidations from 'jhu-deposit-ui/validations/publication';
import ContactValidations from 'jhu-deposit-ui/validations/contact';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset/utils/validator-lookup';

export default class MetadataFormComponent extends Component {
  @service store;

  allChangesets = null;

  /**
   * Setup the changesets needed for this form. If this form involved
   * a single model, the changeset template helper could be used instead
   * to simplify code.
   */
  constructor() {
    super(...arguments);

    this.metadataChangeset = new Changeset(this.args.metadata, lookupValidator(MetadataValidations), MetadataValidations);

    this.authorChangesets = this.args.metadata.authors.toArray().map((author) => {
      return new Changeset(author, lookupValidator(AuthorValidations), AuthorValidations);
    });

    this.grantChangesets = this.args.metadata.grants.toArray().map((grant) => {
      return new Changeset(grant, lookupValidator(GrantValidations), GrantValidations);
    });

    this.publicationChangesets = this.args.metadata.publications.toArray().map((publication) => {
      return new Changeset(publication, lookupValidator(PublicationValidations), PublicationValidations);
    });

    this.contactChangesets = this.args.metadata.contacts.toArray().map((contact) => {
      return new Changeset(contact, lookupValidator(ContactValidations), ContactValidations);
    });
  }

  /**
   * validates and executes any changes in the changesets on the backing
   * models. does not persist changes to the backend.
   */
  @action
  async validateAndExecuteChanges() {
    let forms = document.querySelectorAll('form');
    let event = document.createEvent('Events');

    event.initEvent('submit', true, true);

    forms.forEach((form) => {
      form.dispatchEvent(event);
    });

    this.allChangesets = [
      this.metadataChangeset,
      ...this.contactChangesets,
      ...this.authorChangesets,
      ...this.grantChangesets,
      ...this.publicationChangesets,
    ];

    for(const set of this.allChangesets) {
      await set.validate();
    }

    if (this.allChangesets.isEvery('isValid')) {
      this.args.next(this.allChangesets);
    }
  }
}
