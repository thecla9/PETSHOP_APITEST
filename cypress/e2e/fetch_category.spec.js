describe('Fetch Category by ID', () => {
    before(() => {
      // Fetch and set the admin token before running tests
      cy.fetchAdminToken().as('adminToken');
    });
  
    it('should fetch a category with a specific ID', function() {
      const categoryId = 'c8f28dcc-97eb-4e92-b77b-cb59bdcad1f4'; // Replace with the actual category ID
      const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/order-status'; // Correct URL for fetching order statuses
  
      // Log details for debugging
      cy.log(`Fetching order status with ID: ${categoryId}`);
      cy.log(`Admin Token: ${Cypress.env('ADMIN_API_TOKEN')}`);
  
      cy.request({
        method: 'GET',
        url: `${apiUrl}/${categoryId}`,
        headers: {
          'Authorization': `Bearer ${Cypress.env('ADMIN_API_TOKEN')}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        cy.log(`Response: ${JSON.stringify(response.body)}`);
  
        // Verify successful response
        expect(response.status).to.eq(200); // Status should be 200 OK
        expect(response.body.data).to.not.be.null; // Ensure data is not null
  
        // Optionally, check that the returned category has the correct ID
        expect(response.body.data.uuid).to.eq(categoryId);
      });
    });
  });
  