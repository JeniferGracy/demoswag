module.exports = {
  chromeWebSecurity: false,
  "reporter": "mochawesome",
   "reporterOptions": {
      "reportDir": "cypress/results",
      "overwrite": false,
      "html": false,
      "json": true
   },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/Swaglabs/*.js'
  },
  projectId: "7oxqkn",
  

}
