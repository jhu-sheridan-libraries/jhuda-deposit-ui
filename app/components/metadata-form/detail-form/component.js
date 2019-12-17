import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MetadataFormDetailFormComponent extends Component {
   /**
   * a noop that is needed for the @onSubmit property of the ember-bootstrap form API
   * which we are not utilizing because we need to collect all the changesets
   * and validate/execute changes manually as ember-bootstrap forms can only
   * safely handle one model per form at this time.
   */
  @action
  noop() {}
}
