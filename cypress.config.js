const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
  env: {
    USER_API_TOKEN: process.env.USER_API_TOKEN,
    ADMIN_API_TOKEN: process.env.ADMIN_API_TOKEN,
  },
});
