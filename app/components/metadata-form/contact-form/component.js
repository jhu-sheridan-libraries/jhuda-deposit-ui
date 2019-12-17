import Component from '@glimmer/component';
import { action } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset/utils/validator-lookup';
import ContactValidations from 'jhu-deposit-ui/validations/contact';
import { inject as service } from '@ember/service';
import fade from 'ember-animated/transitions/fade';

export default class MetadataFormContactFormComponent extends Component {
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
  addContact() {
    let contact = this.store.createRecord('contact', {
      metadata: this.args.metadata
    });

    let contactChangeset = new Changeset(contact, lookupValidator(ContactValidations), ContactValidations);

    this.args.contactChangesets.pushObject(contactChangeset);
  }

  @action
  removeContact(contactChangeset, index) {
    let contact = contactChangeset._content;

    this.args.contactChangesets.removeAt(index);
    contact.deleteRecord();
  }
}
