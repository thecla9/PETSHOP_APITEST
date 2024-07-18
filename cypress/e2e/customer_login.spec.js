
describe('Customer Login API Test', () => {
  let authToken = Cypress.env('USER_API_TOKEN'); 

  const loginUrl = 'https://pet-shop.buckhill.com.hr/api/v1/user/login';
  const customerCredentials = { email: 'ezenwathecla90@gmail.com', password: 'go@12345' };

  it('TS-01: Login with the correct customer credentials', () => {
    cy.request({
      method: 'POST',
      url: loginUrl,
      body: customerCredentials,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property("token");
      authToken = response.body.data.token; // Store the token for subsequent requests
    });
  });

  it('TS-02: Incorrect customer Password', () => {
    cy.request({
      method: 'POST',
      url: loginUrl,
      body: {
        email: 'ezenwathecla90@gmail.com',
        password: 'wrongpassword'
      },
      failOnStatusCode: false // Allows checking error responses
    }).then(response => {
      expect(response.status).to.equal(422); // Unauthorized status code
      // Add assertions for error message or specific response handling
    });
  });

  it('TS-03: Empty customer Email Field', () => {
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
