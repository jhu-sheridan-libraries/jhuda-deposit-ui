import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  submission: alias('model'),
  metadata: alias('submission._metadataJson'),

  mdDisplay: computed('metadata', function () {
    const md = this.get('metadata');
    const result = [];

    Object.keys(md).map((key) => {
      result.push({
        label: key,
        value: md[key]
      });
    });

    return result;
  })
});
