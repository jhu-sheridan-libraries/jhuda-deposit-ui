import { Response } from 'miragejs';

export default function (server) {
  server.get('https://archive.local/fcrepo/rest/submissions/**', (schema, request) => {
    const submissions = schema.submissions.all();
    const sub = submissions.models.find(submission => submission.attrs._source['@id'] === request.url);

    return sub.attrs._source;
  });
  /**
   * Mock the response from fcrepo for creating a submission
   */
  server.post('http://localhost:8080/fcrepo/rest/submissions', () => new Response(201, {
    Location: 'https://pass.local/fcrepo/rest/submissions/6a/e3/c0/91/6ae3c091-e87e-4249-a744-72cb93415a95',
    'Content-Type': 'text/plain; charset=UTF-8'
  }));

  /**
   * Mock the response from fcrepo for creating a submission
   */
  server.post('https://archive.local/fcrepo/rest/submissions/**', () => new Response(201, {
    Location: 'https://archive.local/fcrepo/rest/submissions/6a/e3/c0/91/6ae3c091-e87e-4249-a744-72cb93415a95',
    'Content-Type': 'text/plain; charset=UTF-8'
  }));

  /**
   * Mock the response from fcrepo for updating a submission
   */
  server.patch('https://archive.local/fcrepo/rest/submissions/**', () => new Response(204));
}