describe('View User Account API Test', () => {
  let adminToken; // Variable to store the token

  before(() => {
    // Fetch the admin token before running tests
    cy.fetchAdminToken().then((token) => {
      adminToken = token;
    });
  });

  it('should successfully fetch the user account details', () => {
    const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/user';

    // Make the API request with the token in the headers
    cy.request({
      method: 'GET',
      url: apiUrl,
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      failOnStatusCode: false // Handle non-200 status codes
    }).then((response) => {
      // Debugging: Log response status and body
      cy.log(`Response Status: ${response.status}`);
      cy.log(`Response Body: ${JSON.stringify(response.body)}`);

      // Assert the response status code
      expect(response.status).to.equal(200);

      // Assert the response body data against expected values
      const data = response.body.data;
      expect(data.uuid).to.equal('f32e894e-e58e-3240-b6f7-8de3d5c7768d');
      expect(data.first_name).to.equal('Lafayette');
      expect(data.last_name).to.equal('Kessler');
      expect(data.email).to.equal('admin@buckhill.co.uk');
      expect(data.avatar).to.equal('eadb7f8e-e61e-3ba1-bc8a-dcec51697d20');
      expect(data.address).to.equal('12223 Sammie Island\nSouth Emiliano, MS 12858-3327');
      expect(data.phone_number).to.equal('+1.469.494.8081');
      expect(data.is_marketing).to.equal(1);
    });
  });
});
