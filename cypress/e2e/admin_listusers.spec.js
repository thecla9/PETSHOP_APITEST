describe('Admin User Listing API Tests', () => {
  const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing';

  before(() => {
    // Fetch the admin token before running the tests
    cy.fetchAdminToken();
  });

  // Test case to fetch admin user listing with valid filters
  it('TS-01: Fetches admin user listing with valid filters', () => {
    const queryParams = {
      page: 1,
      limit: 4,
      sortBy: 'name',
      desc: true
    };

    const queryString = Object.keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');
    const fullUrl = `${apiUrl}?${queryString}`;

    cy.request({
      method: 'GET',
      url: fullUrl,
      headers: {
        'Authorization': `Bearer ${Cypress.env('ADMIN_API_TOKEN')}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      cy.log('Response Status:', response.status);
      cy.log('Response Body:', JSON.stringify(response.body, null, 2));

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data').that.is.an('array');
    });
  });

  // Test case with invalid token
  it('TS-05: Get users listing with invalid or expired token', () => {
    const invalidToken = 'INVALID_TOKEN';

    cy.request({
      method: 'GET',
      url: apiUrl,
      headers: {
        'Authorization': `Bearer ${invalidToken}`,
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Invalid Token Response Status:', response.status);
      cy.log('Invalid Token Response Body:', JSON.stringify(response.body, null, 2));

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('Unauthorized');
    });
  });
});
