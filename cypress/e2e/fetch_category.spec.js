describe('Fetch Category by ID', () => {
  let authToken = '';
  let categoryId = ''; // Changed from categoryId to avoid confusion with `uuid` from assert-plus

  before(() => {
    // Fetch and set the admin token before running tests
    cy.fetchAdminToken().then((token) => {
      authToken = token;
    });
  });

  beforeEach(() => {
    // Retrieve a valid category UUID before each test
    cy.request({
      method: 'GET',
      url: 'https://pet-shop.buckhill.com.hr/api/v1/categories', // Endpoint to fetch the list of categories
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      const categories = response.body.data; // Assuming the response has categories in `response.body.data`
      if (categories.length > 0) {
        // Extract the UUID from the first category in the list
        categoryId = categories[0].uuid; // Correct variable assignment
      } else {
        throw new Error('No categories found to extract ID from.');
      }
    });
  });

  it('should fetch a category with a specific UUID', function() {
    const apiUrl = `https://pet-shop.buckhill.com.hr/api/v1/category/${categoryId}`; // URL to fetch a specific category

    // Log details for debugging
    cy.log(`Fetching category with UUID: ${categoryId}`);
    cy.log(`Admin Token: ${authToken}`);

    cy.request({
      method: 'GET',
      url: apiUrl,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      cy.log(`Response: ${JSON.stringify(response.body)}`);

      // Verify successful response
      expect(response.status).to.eq(200); // Status should be 200 OK
      expect(response.body.data).to.not.be.null; // Ensure data is not null

      // Optionally, check that the returned category has the correct UUID
      expect(response.body.data.uuid).to.eq(categoryId);
    });
  });

  // Additional test cases can go here, utilizing the dynamically set categoryId
});
