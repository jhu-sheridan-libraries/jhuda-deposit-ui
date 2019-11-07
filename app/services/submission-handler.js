import Service from '@ember/service';

export default Service.extend({

  /**
   * Get display information for the submission status. This includes the display
   * label and a human readable description
   *
   * @param {Submission} submission
   * @returns {
   *    "label": "string",
   *    "description": "string",
   *    "class": 'string'
   * }
   */
  submissionStatusDisplay(submission) {
    switch (submission.status) {
      case 'draft':
        return {
          label: 'draft',
          description: 'The submission is not final and you can still make changes to it',
          class: 'text-secondary'
        };
      case 'requiresAction':
        return {
          label: 'Requires Action',
          description: 'This submission has one or more items that require your attention. Please check the submission page for details',
          class: 'text-danger'
        };
      case 'complete':
        return {
          label: 'Complete',
          description: 'The submission has been finalized and the archive now has custody of all of its data',
          class: 'text-success'
        };
      case 'published':
        return {
          label: 'Published',
          description: 'The submission is publicly available from the archive discovery interface',
          class: 'text-success'
        };
      default:
        return { label: '', description: '' };
    }
  },

  submissionFilesStatus(submission) {
    switch (submission.filesStatus) {
      case 'processing':
        return {
          label: 'Processing',
          description: 'Files are being processed',
          class: 'text-primary'
        };
      case 'requiresAction':
        return {
          label: 'Requires Action',
          description: 'One or more files have been flagged and need your attention. Please check the submission page for details',
          class: 'text-danger'
        };
      case 'complete':
        return {
          label: 'Complete',
          description: '',
          class: 'text-success'
        };
      default:
        return undefined;
    }
  },

  submissionMetadataStatus(submission) {
    switch (submission.metadataStatus) {
      case 'na':
        return {
          label: 'N/A',
          description: 'No metadata has been added to this submission',
          class: 'text-secondary'
        };
      case 'draft':
        return {
          label: 'Draft',
          description: 'Metadata has not been finalized and can change at any time',
          class: 'text-primary'
        };
      case 'requiresAction':
        return {
          label: 'Requires Action',
          description: 'One or more metadata fields have been flagged and need your attention. Please check the submission page for details',
          class: 'text-danger'
        };
      case 'approved':
        return {
          label: 'Approved',
          description: 'The submission metadata ',
          class: 'text-success'
        };
      default:
        return { label: '', description: '' };
    }
  }

});
