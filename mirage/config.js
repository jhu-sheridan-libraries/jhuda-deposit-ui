export default function() {

  this.get('/users/:id');
  this.get('/submissions');
  this.get('/submissions/:id');
  this.del('/submissions/:id');

  this.get('/files/:id');
  this.patch('/files/:id');
  this.delete('/files/:id');

  this.get('/submission-actions/:id');

  this.resource('metadata');
  this.resource('authors');
  this.resource('contacts');
  this.resource('grants');
  this.resource('publications');
}
