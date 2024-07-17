  describe('Admin Login API Test', () => {
    let authToken = Cypress.env('ADMIN_API_TOKEN'); // Get ADMIN_API_TOKEN from .env file
  
    const loginUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/login';
    const adminCredentials = { email: 'admin@buckhill.co.uk', password: 'admin' };
  
    it('TS-01: Login with the correct credentials', () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: adminCredentials,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.property("token");
        authToken = response.body.data.token; // Store the token for subsequent requests
      });
    });
  
    it('TS-02: Incorrect Admin Password', () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: {
          email: 'admin@buckhill.co.uk',
          password: 'wrongpassword'
        },
        failOnStatusCode: false // Allows checking error responses
      }).then(response => {
        expect(response.status).to.equal(422); // Unauthorized status code
        // Add assertions for error message or specific response handling
      });
    });
  
    it('TS-03: Empty Admin Email Field', () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: {
          password: 'password123'
        },
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.equal(422); // Bad request status code
        // Add assertions for error message or specific response handling
      });
    });
  });