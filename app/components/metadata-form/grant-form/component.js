import Component from '@glimmer/component';
import { action } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset/utils/validator-lookup';
import GrantValidations from '../../../validations/grant';
import { inject as service } from '@ember/service';
import fade from 'ember-animated/transitions/fade';

export default class MetadataFormGrantFormComponent extends Component {
  @service store;

  transition=fade;

  /**
   * a noop that is needed for the @onSubmit property of the ember-bootstrap form API
   * which we are not utilizing because we need to collect all the changesets
   * and validate/execute changes manually as ember-bootstrap forms can only
   * safely handle one model per form at this time.
   */
  @action
  noop() {}

  @action
  addGrant() {
    let grant = this.store.createRecord('grant', {
      metadata: this.args.metadata
    });

    let grantChangeset = new Changeset(grant, lookupValidator(GrantValidations), GrantValidations);

    this.args.grantChangesets.pushObject(grantChangeset);
  }

  @action
  removeGrant(grantChangeset, index) {
    let grant = grantChangeset._content;

    this.args.grantChangesets.removeAt(index);

    grant.deleteRecord();
  }
}
