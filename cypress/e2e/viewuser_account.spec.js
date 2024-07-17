describe('View User Account API Test', () => {
    it('should successfully fetch the user account details', () => {
      // Directly use the user token here
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMTg4NDA1LCJ1c2VyX3V1aWQiOiJmY2YzNGNjYS1lNTRlLTRhNmItODg3Ni00MDVkODAxZTI0M2MifQ.jjLBv79HX6uE4QmS4A94kBiyeqXdqJCnKMCwC5JtWuEvVGs5jnu0ak93DEUQXAq7xhuCa7vuJh64qQeFCjr1k3oVgBSmOhYRnM7MxFycJj5FRsCdB5-bgSeinkvr-6HX_aZQqhp2haqz2agr89rxgFgZSKETHxs3V6DS21UCeFA0NxuC9b9aMxhPM0tBb4Bjdm_TIg3s7rzkSYWyBoeGhItd5mT8fwAnF9YQX6JcjesqnlRU4iQBJ6w0cQUi7wdXcMxVvuxialLZHr_uJa9aIqXOjC5Ki7-zGwnFx5wUe4memdLAJzi8Cjkobp5tUtLnGi20rB4Fb0Qe1ESVGyfBGA';
  
      // Define the API URL
      const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/user';
  
      // Make the API request with the token in the headers
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.equal(200);
  
        // Assert the response body
        const data = response.body.data;
        expect(data.uuid).to.equal('fcf34cca-e54e-4a6b-8876-405d801e243c');
        expect(data.first_name).to.equal('Thecla');
        expect(data.last_name).to.equal('Ezenwa');
        expect(data.email).to.equal('ezenwathecla90+4@gmail.com');
        expect(data.email_verified_at).to.be.null;
        expect(data.avatar).to.be.null;
        expect(data.address).to.equal('Olusesan Adetula');
        expect(data.phone_number).to.equal('07043567896');
        expect(data.is_marketing).to.equal(0);
        expect(data.created_at).to.equal('2024-07-17T01:52:02.000000Z');
        expect(data.updated_at).to.equal('2024-07-17T01:53:25.000000Z');
        expect(data.last_login_at).to.equal('2024-07-17 01:53:25');
      });
    });
  });
  