describe('Admin Login and View Profile Test', () => {
  let adminToken; // Variable to store the admin token
  let adminProfile; // Variable to store the admin profile details

  before(() => {
    // Use the custom command to fetch the admin token
    cy.fetchAdminToken().then((token) => {
      adminToken = token;

      // Ensure the token is defined
      expect(adminToken, 'Admin token should be defined').to.not.be.undefined;

      // Optional: Print the token for debugging (ensure you handle tokens securely)
      cy.log(`Admin Token: ${adminToken}`);
    });
  });

  it('should fetch and view the admin profile details', () => {
    const adminProfileApiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/user'; // Replace with actual profile endpoint

    // Fetch the admin profile using the token
    cy.request({
      method: 'GET',
      url: adminProfileApiUrl,
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      failOnStatusCode: false // Handle non-200 status codes
    }).then((response) => {
      // Log the response status and body
      cy.log(`Profile Response Status: ${response.status}`);
      cy.log(`Profile Response Body: ${JSON.stringify(response.body)}`);

      // Assert the response status code
      expect(response.status, 'Profile response status should be 200').to.equal(200);

      // Store the admin profile details
      adminProfile = response.body.data; // Adjust based on actual response structure

      // Log the admin profile details
      cy.log(`Admin Profile: ${JSON.stringify(adminProfile)}`);

      // Perform additional checks on the profile data if needed
      // Example assertions:
      expect(adminProfile).to.have.property('uuid');
      expect(adminProfile).to.have.property('email', 'admin@buckhill.co.uk');
      // Add more checks as needed based on the profile details returned
    });
  });
});
