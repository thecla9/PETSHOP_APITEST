// Helper function to create a product
function createProduct(productDetails) {
    const authToken = Cypress.env('ADMIN_API_TOKEN'); // Ensure this is set correctly in your environment variables
  
    return cy.request({
      method: 'POST',
      url: 'https://pet-shop.buckhill.com.hr/api/v1/products/create', // Verify this endpoint
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: productDetails
    });
  }
  
  // Test to create a product
  describe('Create Product', () => {
    it('should create a new product', () => {
      const productDetails = {
        category_uuid: '3fb43633-ac1e-4b69-ba9c-dc2470a35f18',
        title: 'Test Product',
        price: 99.99,
        description: 'This is a test product.',
        metadata: {
          image: 'test-image-url',
          brand: 'Test Brand'
        }
      };
  
      createProduct(productDetails).then(response => {
        expect(response.status).to.eq(201); // Adjust based on expected status code
        expect(response.body).to.have.property('uuid'); // Check that the response contains a product UUID or other expected fields
      });
    });
  });
  