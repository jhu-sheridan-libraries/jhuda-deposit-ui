import Component from '@glimmer/component';
import { alias } from '@ember/object/computed';

export default class FileCardComponent extends Component {
  @alias('args.fileGrp.file') file;
  @alias('args.fileGrp.actions') actions;
  @alias('args.fileGrp.hasActions') hasActions;
}
