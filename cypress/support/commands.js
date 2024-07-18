// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('checkAndLog', (selector, expectedText) => {
    cy.get(selector)
      .then($el => {
        if ($el.length > 0 && $el.text().includes(expectedText)) {
          cy.log(`Expected text "${expectedText}" found in "${selector}"`);
        } else {
          cy.log(`Expected text "${expectedText}" NOT found in "${selector}"`);
          Cypress.env('testFailed', true);
        }
      });
  });
  Cypress.Commands.add('getNewToken', () => {
    const adminEmail = 'admin@buckhill.co.uk';
    const adminPassword = 'admin';
    const userPassword = 'userpassword';
    const adminLoginUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/login';
    const userListingUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing';
    const userLoginUrl = 'https://pet-shop.buckhill.com.hr/api/v1/user/login';
  
    // Admin login to get the token
    cy.request({
      method: 'POST',
      url: adminLoginUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: adminEmail,
        password: adminPassword
      }
    }).then((adminResponse) => {
      const ADMIN_API_TOKEN = adminResponse.body.data.token;
  
      // Fetch the new user email
      cy.request({
        method: 'GET',
        url: userListingUrl,
        headers: {
          Authorization: `Bearer ${ADMIN_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }).then((userResponse) => {
        const userEmail = userResponse.body.data[0].email; // Assuming the first user in the list
  
        // User login to get the token
        cy.request({
          method: 'POST',
          url: userLoginUrl,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            email: userEmail,
            password: userPassword
          }
        }).then((userLoginResponse) => {
          const USER_API_TOKEN = userLoginResponse.body.data.token;
          // Save the tokens as environment variables
          Cypress.env('ADMIN_API_TOKEN', ADMIN_API_TOKEN);
          Cypress.env('USER_API_TOKEN', USER_API_TOKEN);
        });
      });
    });
  });

  Cypress.Commands.add('getUserUUID', (email) => {
    const adminToken = Cypress.env('ADMIN_API_TOKEN');
    const userListingUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing';
  
    // Fetch the user UUID based on email
    return cy.request({
      method: 'GET',
      url: userListingUrl,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // Check if the response is successful
      expect(response.status).to.equal(200);
  
      const user = response.body.data.find(user => user.email === email);
      if (!user) {
        throw new Error(`User with email ${email} not found.`);
      }
      return user.uuid; // Return the UUID of the user
    });
  });
  
  