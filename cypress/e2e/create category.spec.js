describe('Order Status Creation Tests', () => {
    const generateRandomTitle = () => {
      const titles = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'];
      const randomIndex = Math.floor(Math.random() * titles.length);
      return titles[randomIndex];
    };
  
    before(() => {
      // Fetch and set the admin token before running tests
      cy.fetchAdminToken().as('adminToken');
    });
  
    it('should create a new order status with a random title', function() {
      const randomTitle = generateRandomTitle();
  
      // Log details for debugging
      cy.log(`Attempting to create order status with title: ${randomTitle}`);
      cy.log(`Admin Token: ${Cypress.env('ADMIN_API_TOKEN')}`);
  
      cy.request({
        method: 'POST',
        url: 'https://pet-shop.buckhill.com.hr/api/v1/order-status/create',
        headers: {
          'Authorization': `Bearer ${Cypress.env('ADMIN_API_TOKEN')}`,
          'Content-Type': 'application/json'
        },
        body: {
          title: randomTitle
        }
      }).then((response) => {
        cy.log(`Response: ${JSON.stringify(response.body)}`);
  
        // Verify successful creation
        expect(response.status).to.eq(200); // Expect successful creation (201 Created)
        expect(response.body.success).to.eq(1); // Success should be 1
  
        const createdOrderStatusId = response.body.data.uuid; // Extract the created order status ID
  
        // Optionally, verify the created order status
        cy.request({
          method: 'GET',
          url: `https://pet-shop.buckhill.com.hr/api/v1/order-status/${createdOrderStatusId}`,
          headers: {
            'Authorization': `Bearer ${Cypress.env('ADMIN_API_TOKEN')}`
          }
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(200); // Expect successful fetch (200 OK)
          expect(getResponse.body.data.title).to.eq(randomTitle); // Verify title matches the created order status
        });
      });
    });
  });
  