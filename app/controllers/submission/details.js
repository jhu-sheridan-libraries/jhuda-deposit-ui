import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  submission: alias('model'),
  metadata: alias('submission._metadataJson'),

  mdDisplay: computed('metadata', function () {
    const md = this.get('metadata');

    if (!md) {
      return;
    }

    const result = [];

    Object.keys(md).map((key) => {
      result.push({
        label: key,
        value: md[key]
      });
    });

    return result;
  }),

  // TODO: example actions that can be used in the workflow Files step
  actions: {
    /**
     * Remove the specified file
     * @param {File} file
     */
    removeFile(file) {},

    /**
     * We can trigger an edit to the file somehow 
     * @param {File} file 
     */
    editFile(file) {}
  }
});
