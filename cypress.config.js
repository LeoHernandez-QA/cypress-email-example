const { defineConfig } = require('cypress')

module.exports = defineConfig({
  watchForFileChanges: false,
  fixturesFolder: false,
  viewportWidth: 1200,
  viewportHeight: 800,
  video: false,
  projectId: '9gzopg',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: false,
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
