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

    return metadata;
  }
});
