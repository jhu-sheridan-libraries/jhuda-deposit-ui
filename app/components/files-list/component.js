import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { A } from '@ember/array';

export default class FilesList extends Component {
  // Named properties passed into the component
  files;
  submissionActions;

  editable;

  removeAction;

  /**
   * Combine files with any associated actions so they can be displayed
   * Expect 'files' and 'submissionActions' to be proxy objs
   *
   * NOTE: Somehow, making this a Glimmer component breaks this function
   */
  @computed(
    'files.[]',
    'submissionActions.@each.{key,description}',
  )
  get filesWithActions() {
    const actions = get(this, 'submissionActions') || A();

    return get(this, 'files').map((file) => {
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
