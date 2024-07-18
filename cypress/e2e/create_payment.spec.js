describe('Create Payment API Test', () => {
    let authToken = '';

    const loginUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/login';
    const adminCredentials = { email: 'admin@buckhill.co.uk', password: 'admin' };

    before(() => {
        // Login and obtain auth token before all tests
        cy.request({
            method: 'POST',
            url: loginUrl,
            body: adminCredentials,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.property('token');
            authToken = response.body.data.token; // Store the token for subsequent requests
        });
    });

    it('should successfully create a payment with different methods', () => {
        // Define the API URL for creating payment
        const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/payment/create';

        // Define the request payloads for different payment methods
        const payloads = {
            card: {
                order_uuid: '9f6e9a61-93b4-4f6e-9e35-3d9ccab1f05f',
                payment_method_uuid: '429caf36-7eec-49bd-9c60-aac90a1d6a04', // Replace with actual UUID
                amount: 100.00
            },
            bankTransfer: {
                order_uuid: '9f6e9a61-93b4-4f6e-9e35-3d9ccab1f05f',
                payment_method_uuid: 'b2de02a7-7420-4eb4-af39-badaf1e69c23', // Replace with actual UUID
                amount: 100.00
            },
            cashOnDelivery: {
                order_uuid: '9f6e9a61-93b4-4f6e-9e35-3d9ccab1f05f',
                payment_method_uuid: '4d3191bc-df31-4bce-94d5-5e85d1b0f07d', // Replace with actual UUID
                amount: 100.00,
                shipping_address: {
                    street: '2 Larry street',
                    city: 'Lagos',
                    country: 'Nigeria'
                }
            }
        };

        // Choose which payload to use based on the payment method (card, bankTransfer, or cashOnDelivery)
        const selectedPayload = payloads.cashOnDelivery; // Change this to payloads.card or payloads.bankTransfer as needed

        // Make the API request with the token in the headers
        cy.request({
            method: 'POST',
            url: apiUrl,
            headers: {
                Authorization: `Bearer ${authToken}`,
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
