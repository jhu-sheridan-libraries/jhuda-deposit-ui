import DS from 'ember-data';
const { Model, attr } = DS;

export default class SubmissionAction extends Model {
  @attr('string') key;
  @attr('string') type; // file, metadata
  @attr('string') status; // modified, changeRequested
  @attr('string') description;
}
