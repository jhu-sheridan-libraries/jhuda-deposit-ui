export default function() {

  this.get('/users/:id');
  this.get('/submissions');
  this.get('/submissions/:id');

  this.get('/files/:id');
  this.patch('/files/:id');
  this.delete('/files/:id');

  this.get('/submission-actions/:id');

}
