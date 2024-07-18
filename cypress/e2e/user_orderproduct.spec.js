describe('Create Order API Test', () => {
    it('should successfully create an order', () => {

        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMjY2NDQzLCJ1c2VyX3V1aWQiOiJmZWI3ZjliNS1kZDZjLTQ3YjEtOTA2My05YTc1OGZhZGM0ZWIifQ.sw8mtFHwpWMPBl-KJVRNF7_DbVkLsyui0ALoRd_MAvs6D8X8CgOTRVSqPvaIOchNPKlJ68jKVfjPocoQdnEG5CEfmLWMAsrSVi1aFcNfpOsQgb4WqCrePN5uzvJgrBeugUfGQMPOqI9zGOu2rn1yEAEb1JkR1znW-E6N1r6I-VBmJ_Ao0pAAJgobuOzsgO2ghYg8El-luYEbbllWnx8lDqtKGOlZfWnHPR9Npn7G1DDky0Eot_CBln7tRN09sR9zJxGzw9Ahhry92fOHRv6MJzlpb0hSEgcccyJIhCC-f8-VmpYe1XLtM4AtfYjR2hl-Y_SBk_8O9888JF3IJE7chQ';
        const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/order/create';

        const payload = {
            order_status_uuid: '0d502d2f-bfac-376f-83a7-0f66f1f04081',
            payment_uuid: 'd4d79ad2-c9cd-4f6d-bd60-778e60d4baf1',
            products: [
                { uuid: 'e70e993a-4275-30e7-8bfd-5f9126e85b46', quantity: 2 },
                { uuid: '0d502d2f-bfac-376f-83a7-0f66f1f04081', quantity: 2 }
            ],
            address: {
                billing: {
                    street: '2 Larry street',
                    city: 'Lagos',
                    state: 'Lagos State',
                    country: 'Nigeria',
                    postal_code: '12345'
                },
                shipping: {
                    street: '2 Larry street',
                    city: 'Lagos',
                    state: 'Lagos State',
                    country: 'Nigeria',
                    postal_code: '12345'
                }
            }
        };

        // Make the API request with the token in the headers
        cy.request({
            method: 'POST',
            url: apiUrl,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: payload // Include the payload in the request
        }).then((response) => {
            // Log the response body for debugging
            cy.log(JSON.stringify(response.body));

            // Assert the response status code
            expect(response.status).to.equal(200);

            // Assert the response body if the status is 200
            if (response.status === 200) {
                const data = response.body.data;
                expect(data).to.have.property('uuid').that.is.a('string');
            }
        });
    });
});

