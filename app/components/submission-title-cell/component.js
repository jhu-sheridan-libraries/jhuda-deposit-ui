import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { isArray } from '@ember/array';

/**
 * Named properties passed to this component:
 *  - record {Submission}
 */
export default class SubmissionTitleCell extends Component {
  @alias('args.record') submission;
  @alias('record.requiredActions') subActions;

  get hasActions() {
    return isArray(this.subActions) && this.subActions.length > 0;
  }

  get actionMessages() {
    return this.subActions.mapBy('details');
  }
}
