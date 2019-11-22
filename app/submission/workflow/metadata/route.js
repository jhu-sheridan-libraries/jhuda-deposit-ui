import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let authors = [
                    await this.store.createRecord('author', {
                      name: 'Moo',
                      affiliation: 'hey'
                    }),
                    await this.store.createRecord('author', {
                      name: 'Meow',
                      affiliation: null
                    })
                  ];
    let metadata = await this.store.createRecord('metadata', { authors });

    // let sub = await this.store.findRecord('submission', 6);

    // return sub._metadataJson;
    return metadata;
  }
});
