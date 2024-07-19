describe('List All Payments API Test', () => {
    let authToken = '';
  
    before(() => {
      // Retrieve user token before all tests
      cy.getNewToken().then((user) => {
        authToken = user.token;
      });
    });
  
    it('should list all payments across all pages', () => {
      const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/payments';
      let page = 1;
      let allPayments = [];
  
      function fetchPayments(page) {
        cy.request({
          method: 'GET',
          url: `${apiUrl}?page=${page}`,
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
          expect(data).to.be.an('array'); // Assuming the response contains an array of payments
  
          // Append fetched payments to allPayments array
          allPayments = allPayments.concat(data);
  
          // If there are more payments, fetch the next page
          if (data.length > 0) {
            fetchPayments(page + 1);
          } else {
            // Log the total number of payments for debugging
            cy.log('Total number of payments:', allPayments.length);
          }
        });
      }
  
      // Start fetching payments from the first page
      fetchPayments(page);
    });
  });
  