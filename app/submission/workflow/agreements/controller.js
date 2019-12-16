import { action } from '@ember/object';
import Controller, {
  inject as controller
} from '@ember/controller';

export default class SubmissionWorkflowAgreementsController extends Controller {
  @controller('submission.workflow') parentController;

  @action
  cancel() {
    this.parentController.send('cancel');
  }

  @action
  back() {
    this.parentController.send('back');
  }

  @action
  next() {
    this.parentController.send('next');
  }
}
