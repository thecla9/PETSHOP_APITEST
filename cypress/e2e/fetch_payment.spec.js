describe('Payment API Tests', () => {
    let authToken = '';
    const paymentUUID = '47cfd527-5f6e-484c-9cd7-56b7979dff8f'; // Using the specified payment UUID
  
    before(() => {
      // Retrieve user token before all tests
      cy.getNewToken().then((user) => {
        authToken = user.token;
      });
    });
  
    it('should fetch payment details by UUID', () => {
      const apiUrl = `https://pet-shop.buckhill.com.hr/api/v1/payment/${paymentUUID}`;
  
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response status:', response.status);
        cy.log('Response body:', JSON.stringify(response.body));
  
        // Assert the response status code
        expect(response.status).to.equal(200);
  
        // Assert the response body
        const data = response.body.data;
        expect(data).to.have.property('uuid').that.equals(paymentUUID);
      });
    });
  
    it('should handle invalid UUID', () => {
      const invalidUUID = 'invalid-uuid';
      const apiUrl = `https://pet-shop.buckhill.com.hr/api/v1/payment/${invalidUUID}`;
  
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false // Allow the test to proceed even if the status code is not 2xx
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response status:', response.status);
        cy.log('Response body:', JSON.stringify(response.body));
  
        // Assert the response status code
        expect(response.status).to.equal(404);
      });
    });
  
    it('should handle unauthorized request', () => {
      const apiUrl = `https://pet-shop.buckhill.com.hr/api/v1/payment/${paymentUUID}`;
  
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false // Allow the test to proceed even if the status code is not 2xx
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response status:', response.status);
        cy.log('Response body:', JSON.stringify(response.body));
  
        // Assert the response status code
        expect(response.status).to.equal(401);
      });
    });
  
    it('should handle missing UUID in URL', () => {
      const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/payment/';
  
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false // Allow the test to proceed even if the status code is not 2xx
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response status:', response.status);
        cy.log('Response body:', JSON.stringify(response.body));
  
        // Assert the response status code
        expect(response.status).to.equal(404);
      });
    });
  });
  