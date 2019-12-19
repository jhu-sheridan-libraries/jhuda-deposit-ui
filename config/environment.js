'use strict';

/**
 * This ENV provides some defaults for the `ember-fedora-adapter` except
 * for its **context**. This must be passed to this app at build time as
 * an environment variable, either through a .env file or on the command
 * line.
 */
module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'jhu-deposit-ui',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
        _JQUERY_INTEGRATION: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fedora: {
      base: 'http://localhost:8080/fcrepo/rest/',
      context: '',
      data: 'http://oapass.org/ns/jhuda#',
      elasticsearch: 'http://localhost:9200/jhuda/_search'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  /*
   * ###########################################################################
   *    Some properties will be configured externally
   * ###########################################################################
   */
  if ('EMBER_ROOT_URL' in process.env) {
    ENV.rootURL = process.env.EMBER_ROOT_URL;
  }

  // Fedora adapter properties
  if ('FEDORA_ADAPTER_BASE' in process.env) {
    ENV.fedora.base = process.env.FEDORA_ADAPTER_BASE;
  }
  if ('FEDORA_ADAPTER_CONTEXT' in process.env) {
    ENV.fedora.context = process.env.FEDORA_ADAPTER_CONTEXT;
  }
  if ('FEDORA_ADAPTER_DATA' in process.env) {
    ENV.fedora.data = process.env.FEDORA_ADAPTER_DATA;
  }
  if ('FEDORA_ADAPTER_ES' in process.env) {
    ENV.fedora.elasticsearch = process.env.FEDORA_ADAPTER_ES;
  }
  if ('FEDORA_ADAPTER_USER_NAME' in process.env) {
    ENV.fedora.username = process.env.FEDORA_ADAPTER_USER_NAME;
  } else {
    ENV.fedora.username = 'admin';
  }
  if ('FEDORA_ADAPTER_PASSWORD' in process.env) {
    ENV.fedora.password = process.env.FEDORA_ADAPTER_PASSWORD;
  } else {
    ENV.fedora.password = 'moo';
  }

  return ENV;
};
