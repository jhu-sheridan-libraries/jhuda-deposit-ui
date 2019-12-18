import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;

  // Tell the inflector that the plural of "advice" is "advice"
  inflector.uncountable('metadata');
}

export default {
  name: 'custom-inflector-rules',
  initialize
};
