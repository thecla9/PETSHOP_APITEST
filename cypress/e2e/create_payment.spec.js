describe('Create Payment API Test', () => {
    it('should successfully create a payment for an order', () => {
      // Define the user token here (ensure this token is valid and has necessary permissions)
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMTg4NDA1LCJ1c2VyX3V1aWQiOiJmY2YzNGNjYS1lNTRlLTRhNmItODg3Ni00MDVkODAxZTI0M2MifQ.jjLBv79HX6uE4QmS4A94kBiyeqXdqJCnKMCwC5JtWuEvVGs5jnu0ak93DEUQXAq7xhuCa7vuJh64qQeFCjr1k3oVgBSmOhYRnM7MxFycJj5FRsCdB5-bgSeinkvr-6HX_aZQqhp2haqz2agr89rxgFgZSKETHxs3V6DS21UCeFA0NxuC9b9aMxhPM0tBb4Bjdm_TIg3s7rzkSYWyBoeGhItd5mT8fwAnF9YQX6JcjesqnlRU4iQBJ6w0cQUi7wdXcMxVvuxialLZHr_uJa9aIqXOjC5Ki7-zGwnFx5wUe4memdLAJzi8Cjkobp5tUtLnGi20rB4Fb0Qe1ESVGyfBGA';
  
      // Define the API URL for creating payment
      const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/payment/create';
  
      // Define the request payload for creating payment (example for card payment)
      const payloadCard = {
        order_uuid: '9f6e9a61-93b4-4f6e-9e35-3d9ccab1f05f', // Replace with actual order UUID
        payment_method_uuid: '429caf36-7eec-49bd-9c60-aac90a1d6a04', // Replace with actual payment method UUID for card
        amount: 100.00 // Replace with actual payment amount
      };
  
      // Define the request payload for creating payment (example for bank transfer)
      const payloadBankTransfer = {
        order_uuid: '9f6e9a61-93b4-4f6e-9e35-3d9ccab1f05f', // Replace with actual order UUID
        payment_method_uuid: 'b2de02a7-7420-4eb4-af39-badaf1e69c23', // Replace with actual payment method UUID for bank transfer
        amount: 100.00 // Replace with actual payment amount
      };
  
      // Define the request payload for creating payment (example for cash on delivery)
      const payloadCashOnDelivery = {
        order_uuid: '9f6e9a61-93b4-4f6e-9e35-3d9ccab1f05f', // Replace with actual order UUID
        payment_method_uuid: '4d3191bc-df31-4bce-94d5-5e85d1b0f07d', // Replace with actual payment method UUID for cash on delivery
        amount: 100.00, // Replace with actual payment amount
        shipping_address: {
          street: '2 Larry street',
          city: 'Lagos',
          country: 'Nigeria'
          // Add more fields as necessary for the shipping address
        }
      };
  
      // Choose which payload to use based on the payment method
      const selectedPayload = payloadCashOnDelivery; // Change this to payloadCard or payloadBankTransfer as needed
  
      // Make the API request with the token in the headers
      cy.request({
        method: 'POST',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: selectedPayload // Include the selected payload in the request
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.equal(200);
  
        // Assert the response body if the status is 200
        if (response.status === 200) {
          const data = response.body.data;
          expect(data).to.have.property('uuid').that.is.a('string'); // Assuming the response includes a payment UUID
        }
      });
    });
  });
  