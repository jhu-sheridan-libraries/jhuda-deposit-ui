import Component from '@glimmer/component';
import { A } from '@ember/array';

/**
 * Named properties passed to this component
 *  - files
 *  - submissionActions
 *  - editable
 *  - removeAction
 */
export default class FilesList extends Component {

  /**
   * Combine files with any associated actions so they can be displayed
   */
  get filesWithActions() {
    const actions = this.args.submissionActions || A();

    return this.args.files.map((file) => {
      const id = file.id;
      const fileActions = actions.filter(a => a.key === id);

      return {
        file,
        hasActions: fileActions.length > 0,
        actions: fileActions
      };
    });
  }
}
