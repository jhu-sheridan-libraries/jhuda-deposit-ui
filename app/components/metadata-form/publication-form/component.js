import Component from '@glimmer/component';
import { action } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset/utils/validator-lookup';
import PublicationValidations from '../../../validations/publication';
import { inject as service } from '@ember/service';

export default class MetadataFormPublicationFormComponent extends Component {
  @service store;

  /**
   * a noop that is needed for the @onSubmit property of the ember-bootstrap form API
   * which we are not utilizing because we need to collect all the changesets
   * and validate/execute changes manually as ember-bootstrap forms can only
   * safely handle one model per form at this time.
   */
  @action
  noop() {}

  @action
  addPublication() {
    let publication = this.store.createRecord('publication', {
      metadata: this.args.metadata
    });

    let publicationChangeset = new Changeset(publication, lookupValidator(PublicationValidations), PublicationValidations);

    this.args.publicationChangesets.pushObject(publicationChangeset);
  }

  @action
  removePublication(publicationChangeset, index) {
    let publication = publicationChangeset._content;

    this.args.publicationChangesets.removeAt(index);

    publication.deleteRecord();
  }
}
