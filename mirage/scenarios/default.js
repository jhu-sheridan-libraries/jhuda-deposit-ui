export default function(server) {
  const users = server.createList('user', 3);
  // Make some submission objects
  server.create('submission', { user: users[0] });  // Base draft submission

  // Draft submission with metadata, no files
  server.create('submission', 'hasMetadata', { metadataStatus: 'scanning', user: users[0] });

  // Draft submission with random metadata and uploading files
  server.create('submission', 'randomMetadata', 'metadataNeedsApproval', 'hasFiles', {
    user: users[0]
  });

  // Submission with files being uploaded and metadata that has been modified by the curator
  server.create('submission', 'hasMetadata', 'hasFiles', 'uploadingFiles', 'metadataNeedsApproval',
    {
      user: users[0],
      metadata: '{"title": "Submission with uploading files and metadata that needs approval"}'
    });

  // Submission with files that need changing, metadata that is approved
  server.create('submission', 'fileMustChange', {
    user: users[0],
    metadataStatus: 'approved',
    metadata: '{"title": "Submission with a bad file, but good metadata"}'
  });
}
