import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    // Load all submissions to be displayed here

    // const submission = this.store.query('submission', { user: '1' }, { include: 'files' });
    // const files = submission.then(sub => sub.get('files'));

    // return hash({
    //   submission,
    //   files
    // });
    // const submission = this.store.query('submission', { user: '1' }, { include: 'files' });

    // submission.then((sub) => {
    //   debugger
    //   console.log(`This submission has 'files'? ${!!sub.get('files')}`)
    //   sub.get('files').then((fs) => {debugger});
    // });

    // return submission;
    return this.store.query('submission', { user: '1' }, { include: 'files' });
  }
});
