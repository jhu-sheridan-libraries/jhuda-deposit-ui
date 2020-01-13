import { pluralize } from 'ember-inflector';

export default function (server) {
  /** Mock the responses from ES */
  server.get('http://localhost:9200/jhuda/**', () => true);

  server.post('http://localhost:9200/jhuda/**', (schema, request) => {
    let type = JSON.parse(request.requestBody)
      .query.bool.filter
      .term['@type']
      .toLowerCase();
    type = pluralize(type);

    const models = schema[type].all().models.map(model => model.attrs);

    return {
      hits: {
        max_score: 1,
        hits: models,
        total: models.length
      }
    };
  });
}
