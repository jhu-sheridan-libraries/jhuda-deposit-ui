import DS from 'ember-data';
const { Model, attr } = DS;

export default class SubmissionAction extends Model {
  @attr key;
  @attr type; // file, metadata
  @attr status; // modified, changeRequested
  @attr description;
}
