export default function (server) {
  server.get('https:/archive.local/fcrepo/rest/submission-actions/**', (schema, request) => {
    const response = schema.submissionActions.findBy({ _source: { '@id': request.url } });
    return response.attrs._source;
  });
}