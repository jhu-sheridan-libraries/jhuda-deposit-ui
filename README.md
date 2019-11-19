# JHU Data Archive Deposit UI

The Johns Hopkins University Data Archive (JHUDA) user interface (UI) defines the user facing side of our enhanced data archive. It will let a user create a new package to deposit into the data archive by letting them select files and define metadata for the files and the package. A key feature for this interface is integration with OneDrive, which will let a user pick files from their OneDrive account to be included in a data package.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd jhuda-deposit-ui`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests). This is useful for using browser features like the debugger.

### Code Generators

The structure of this project is a mix of Ember classic and pod layouts. Essentially, **components**, **routes**, **controllers**, and **templates** follow a pod-like layout and other files follow the classic layout. See [Ember project layouts](https://cli.emberjs.com/release/advanced-use/project-layouts/) for more details.

Make use of the many generators for code, try `ember help generate` for more details. When generating components, routes, controllers, or templates, please use the `--pod` flag to let the generator know the correct place to create the new file(s).

```
ember g controller my-controller --pod
```

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

TODO

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
