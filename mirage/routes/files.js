import { Response } from 'miragejs';

export default function (server) {
  server.get('https://archive.local/fcrepo/rest/files/**', (schema, request) => {
    const all = schema.files.all();
    const file = all.models.find(file => file.attrs._source['@id'] === request.url);

    return file.attrs._source;
  });
  /** Mock response from fcrepo for creating a File */
  server.post('http://localhost:8080/fcrepo/rest/files/**', () => new Response(201, {
    Location: 'https://archive.local/fcrepo/rest/files/'
  }));
}