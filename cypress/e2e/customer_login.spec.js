describe('Customer Login API Test', () => {
  let customerEmail;  // Variable to store the email

  before(() => {
    // Perform admin login, fetch user email, and perform user login
    cy.getNewToken().then((result) => {
      customerEmail = result.email;  // Store the email in the variable
      cy.log('Fetched customer email:', customerEmail);
      expect(customerEmail).to.be.a('string'); // Ensure the email is correctly fetched
    });
  });

  it('TS-01: Login with the correct customer credentials', () => {
    cy.request({
      method: 'POST',
      url: 'https://pet-shop.buckhill.com.hr/api/v1/user/login',
      body: {
        email: customerEmail,  // Use the variable directly
        password: 'userpassword'
      },
      failOnStatusCode: false
    }).then(response => {
      cy.log('Response for TS-01:', response);
      expect(response.status).to.equal(200); // Success status code
      expect(response.body).to.have.property('data'); 
    });
  });

  it('TS-02: Incorrect customer Password', () => {
    cy.request({
      method: 'POST',
      url: 'https://pet-shop.buckhill.com.hr/api/v1/user/login',
      body: {
        email: customerEmail,  // Use the variable directly
        password: 'wrongpassword'
      },
      failOnStatusCode: false
    }).then(response => {
      cy.log('Response for TS-02:', response);
      expect(response.status).to.equal(422); // Unauthorized status code
      expect(response.body).to.have.property('error'); // Check for error message
    });
  });

  it('TS-03: Empty customer Email Field', () => {
    cy.request({
      method: 'POST',
      url: 'https://pet-shop.buckhill.com.hr/api/v1/user/login',
      body: {
        password: 'userpassword'
      },
      failOnStatusCode: false
    }).then(response => {
      cy.log('Response for TS-03:', response);
      expect(response.status).to.equal(422); // Bad request status code
      expect(response.body).to.have.property('error'); // Check for error message
    });
  });

  it('TS-04: Empty customer Password Field', () => {
    cy.request({
      method: 'POST',
      url: 'https://pet-shop.buckhill.com.hr/api/v1/user/login',
      body: {
        email: customerEmail  // Use the variable directly
      },
      failOnStatusCode: false
    }).then(response => {
      cy.log('Response for TS-04:', response);
      expect(response.status).to.equal(422); // Bad request status code
      expect(response.body).to.have.property('error'); // Check for error message
    });
  });
});
