# PETSHOP_APITEST
API automation testing with Cypress version 12.7.0

This repository contains end-to-end (E2E) tests for Petshop web application using Cypress. Cypress is a modern JavaScript-based end-to-end testing framework that enables you to write and run tests for web applications.

## Getting Started

Follow the instructions below to set up the Cypress test environment and run the tests.

### Prerequisites

Before running the tests, ensure you have the following installed on your machine:

- Node.js
- npm or yarn (package manager)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository_url>

2. Navigate to the repository directory:

    ``` bash
    cd <repository_directory>

3. Install the project dependencies:

    ``` bash
    npm install cypress --save-dev

#### Running the Tests
Option 1: Run tests in the Cypress Test Runner (Interactive Mode)

    ``` bash
    npx cypress open
    
Option 2: Run tests in headless mode (CI/CD)

    ``` bash
    npx cypress run

#### Writing Tests
    This project follows the Page Object Model (POM) design pattern for test organization. You can find page objects in the cypress/page-objects directory, and test spec files in the cypress/e2e directory
    Note: Mock data is used for the purpose of this test... to run the customerlogin and other tests that requires gettoken ensure that the the first email in the DB can be processed to avoid having status code 422 unprocess entity - this could be a reason these test will fail. 

#### Custom Commands and Utilities
This project may include custom Cypress commands, utility functions, or fixtures located in the cypress/support directory. These can be used to enhance test readability and reusability.

#### Environment Configuration
You can configure different environments (e.g., development, staging, production) in the cypress.json file. Specify base URLs and other settings as needed.

#### Continuous Integration (CI/CD)
You can integrate this Cypress test suite into your CI/CD pipeline for automated testing.

#### Screenshots and Videos
Cypress can capture screenshots and videos during test runs, which can be helpful for debugging. This is Configured in the cypress.json file and you can view screen shots of errors and videos.

 #### Reporting
Cypress provides built-in reporters like mochawesome and mochawesome-merge for generating test reports. You can configure these in the cypress.json file as well.
You first need to start the mocha server  using http-server -p 8080 and then view generated reports in html - http://127.0.0.1:8080/mochawesome-report/

