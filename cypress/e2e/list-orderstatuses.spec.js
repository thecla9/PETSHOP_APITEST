describe('List Order Statuses API Test', () => {
    it('should successfully fetch the order statuses', () => {
      // Add the user token directly here
      const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMTg4NDA1LCJ1c2VyX3V1aWQiOiJmY2YzNGNjYS1lNTRlLTRhNmItODg3Ni00MDVkODAxZTI0M2MifQ.jjLBv79HX6uE4QmS4A94kBiyeqXdqJCnKMCwC5JtWuEvVGs5jnu0ak93DEUQXAq7xhuCa7vuJh64qQeFCjr1k3oVgBSmOhYRnM7MxFycJj5FRsCdB5-bgSeinkvr-6HX_aZQqhp2haqz2agr89rxgFgZSKETHxs3V6DS21UCeFA0NxuC9b9aMxhPM0tBb4Bjdm_TIg3s7rzkSYWyBoeGhItd5mT8fwAnF9YQX6JcjesqnlRU4iQBJ6w0cQUi7wdXcMxVvuxialLZHr_uJa9aIqXOjC5Ki7-zGwnFx5wUe4memdLAJzi8Cjkobp5tUtLnGi20rB4Fb0Qe1ESVGyfBGA';
  
      // Define the API URL with query parameters
      const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/order-statuses?page=1&limit=2&desc=true';
  
      // Make the API request with the token in the headers
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.equal(200);
  
        // Assert the response body
        const data = response.body.data;
        expect(data).to.be.an('array').that.is.not.empty;
  
        // Example assertion to check the structure of the returned data
        data.forEach((status) => {
          expect(status).to.have.property('uuid').that.is.a('string');
          expect(status).to.have.property('title').that.is.a('string');
          expect(status).to.have.property('created_at').that.is.a('string');
          expect(status).to.have.property('updated_at').that.is.a('string');
        });
      });
    });
  });
  