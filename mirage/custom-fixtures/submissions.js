import faker from 'faker';

export default [
  {
    '@id': 'https://archive.local/fcrepo/rest/submissions/43/b7/ba/ba/43b7baab-2f6d-4fc4-97d5-0eca8ac01127',
    '@context': 'https://jhu-sheridan-libraries.github.io/jhuda-data-models/ui/context/context-1.0.jsonld',
    '@type': 'Submission',
    user: 'depositor',
    accessUrl: '',
    status: 'draft',
    metadataStatus: 'na',
    filesStatus: 'na',
    metadata: '{}',
    files: [],
    requiredActions: []
  },
  {
    '@id': 'https://archive.local/fcrepo/rest/submissions/c2/74/73/19/c2747319-1fec-4ed0-ad45-b5037af43452',
    '@context': 'https://jhu-sheridan-libraries.github.io/jhuda-data-models/ui/context/context-1.0.jsonld',
    '@type': 'Submission',
    user: 'depositor',
    accessUrl: '',
    status: 'draft',
    metadataStatus: 'pendingReview',
    filesStatus: 'na',
    metadata: '{"title": "Submission with metadata but no files", "one": "moo", "moo": "too", "description": "Description of the submission goes here", "keywords": "", "contactName": "Moo Jones", "contactEmail": "moo.jones@moo.oom"}',
    files: [],
    requiredActions: []
  },
  {
    '@id': 'https://archive.local/fcrepo/rest/submissions/ff/35/13/e8/ff3513e8-de9c-4855-9de0-0e5e73f487ba',
    '@context': 'https://jhu-sheridan-libraries.github.io/jhuda-data-models/ui/context/context-1.0.jsonld',
    '@type': 'Submission',
    user: 'depositor',
    accessUrl: '',
    status: 'requiresAction',
    metadataStatus: 'requiresAction',
    filesStatus: 'processing',
    metadata: '{"title": "Submission with files and modified metadata", "one": "moo", "moo": "too", "keywords": "", "contactName": "Moo Jones", "contactEmail": "moo.jones@moo.oom"}',
    files: [
      'https://archive.local/fcrepo/rest/files/78/ef/71/a0/78ef71a0-d406-45ee-b05d-02769c568b4f',
      'https://archive.local/fcrepo/rest/files/dc/30/bc/4c/dc30bc4c-6d6d-4b31-9550-8fb82473817d'
    ],
    requiredActions: [
      'https://archive.local/fcrepo/rest/submission-actions/9e/a2/34/cf/9ea234cf-702a-43cf-925a-bded2a1ce34e'
    ]
  },
  {
    '@id': 'https://archive.local/fcrepo/rest/submissions/11/e4/c1/af/11e4c1af-53fd-467a-b975-5561d3fd537c',
    '@context': 'https://jhu-sheridan-libraries.github.io/jhuda-data-models/ui/context/context-1.0.jsonld',
    '@type': 'Submission',
    user: 'depositor',
    accessUrl: '',
    status: 'draft',
    metadataStatus: 'approved',
    filesStatus: 'requiresAction',
    metadata: '{"title": "Submission with metadata and files that need changing", "description": "This submission has good metadata and multiple files. One of the associated files needs to be updated by the user", "keywords": "", "contactName": "Moo Jones", "contactEmail": "moo.jones@moo.oom"}',
    files: [
      'https://archive.local/fcrepo/rest/files/10/d3/31/01/10d33101-a31d-4bf0-8f99-d045fca4eaba',
      'https://archive.local/fcrepo/rest/files/b5/99/4d/76/b5994d76-300c-4c80-8c15-87b42366f0ab',
      'https://archive.local/fcrepo/rest/files/da/3b/c9/8a/da3bc98a-8931-4833-a26b-a0dad82d2de7'
    ],
    requiredActions: [
      'https://archive.local/fcrepo/rest/submission-actions/a0/aa/26/b2/a0aa26b2-f127-4720-bb40-8df1e3db4335'
    ]
  },
  {
    '@id': 'https://archive.local/fcrepo/rest/submissions/23/07/cf/c1/2307cfc1-5d0f-416f-9f0e-c8ea43d1fccd',
    '@context': 'https://jhu-sheridan-libraries.github.io/jhuda-data-models/ui/context/context-1.0.jsonld',
    '@type': 'Submission',
    user: 'other_depositor',
    status: 'complete',
    metadataStatus: 'approved',
    filesStatus: 'approved',
    metadata: `{"collectionTitle": "Submission completed by someone else", "description": "A nice description", "softwareUse": "Please use the software in this way", "dataUse": "Please do not use the data in that way", "keywords": "", "authors": [{"id": "${faker.random.uuid()}", "name": "moo", "affiliation": "JHU"}], "contacts": [{"id": "${faker.random.uuid()}", "name": "Bessie Holstein", "email": "besstein@cow.edu"}], "publications": [{"id": "${faker.random.uuid()}", "doi": "12321213.12AGC", "title": "A title"}], "grants": [{"id": "${faker.random.uuid()}", "awardNumber": "2342321", "projectName": "A nice project", "fundingAgency": "An Agency"}]}`,
    files: [
      'https://archive.local/fcrepo/rest/files/67/d0/5b/e9/67d05be9-3f01-4bb3-81cd-6fcb66aca5ea'
    ],
    requiredActions: []
  }
];
