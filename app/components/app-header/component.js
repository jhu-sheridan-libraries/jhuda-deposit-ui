import Component from '@glimmer/component';
import ENV from 'jhu-deposit-ui/config/environment';

export default class AppHeader extends Component {
  rootURL = ENV.rootURL;
}
