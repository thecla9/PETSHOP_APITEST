describe('Admin Edit User Details API Test', () => {
    let authToken = '';

    const loginUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/login';
    const editUrlBase = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-edit/';

    before(() => {
        // Login and obtain auth token before all tests
        cy.request({
            method: 'POST',
            url: loginUrl,
            body: {
                email: 'admin@buckhill.co.uk',
                password: 'admin',
            },
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.property('token');
            authToken = response.body.data.token; // Store the token for subsequent requests
        });
    });

    it('TS-01 should edit user details successfully', () => {
        // Fetch user ID dynamically from user listing endpoint or use a known valid ID
        cy.request({
            method: 'GET',
            url: 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((listingResponse) => {
            expect(listingResponse.status).to.equal(200);
            expect(listingResponse.body.data).to.be.an('array').that.is.not.empty;

            // Use the first user ID from the listing response
            const userId = listingResponse.body.data[0].uuid;

            // Prepare updated user data
            const updatedUserData = {
                uuid: userId,
                first_name: 'Thecla',
                last_name: 'Phil0',
                email: 'ezenwathecla90@gmail.com',
                address: 'olusesan',
                phone_number: '+1234567899',
                password: 'go@12345',
                confirm_password: 'go@12345',
                is_marketing: 0,
            };

            // Make the request to edit user details
            cy.request({
                method: 'PUT',
                url: editUrlBase + userId,
                form: true,
                body: updatedUserData,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(200);
                // Add more assertions for successful update if needed
            });
        });
    });

    it('TS-02 should handle invalid email format', () => {
        // Fetch user ID dynamically or use a known valid ID
        cy.request({
            method: 'GET',
            url: 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((listingResponse) => {
            expect(listingResponse.status).to.equal(200);
            expect(listingResponse.body.data).to.be.an('array').that.is.not.empty;

            // Use the first user ID from the listing response
            const userId = listingResponse.body.data[0].uuid;

            // Prepare invalid email data
            const invalidEmailData = {
                uuid: userId,
                email: 'invalidemail', // Invalid email format
            };

            // Make the request with invalid email data
            cy.request({
                method: 'PUT',
                url: editUrlBase + userId,
                form: true,
                body: invalidEmailData,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(422);
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.include('Failed Validation');
            });
        });
    });

    it('TS-03 should handle empty password confirmation', () => {
        // Fetch user ID dynamically or use a known valid ID
        cy.request({
            method: 'GET',
            url: 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((listingResponse) => {
            expect(listingResponse.status).to.equal(200);
            expect(listingResponse.body.data).to.be.an('array').that.is.not.empty;

            // Use the first user ID from the listing response
            const userId = listingResponse.body.data[0].uuid;

            // Prepare empty password confirmation data
            const emptyPasswordConfirmData = {
                uuid: userId,
                password: 'go@12345',
                confirm_password: '', // Empty password confirmation
            };

            // Make the request with empty password confirmation data
            cy.request({
                method: 'PUT',
                url: editUrlBase + userId,
                form: true,
                body: emptyPasswordConfirmData,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(422);
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.include('Failed Validation');
            });
        });
    });

    it('TS-04 should handle invalid or expired token', () => {
        // Fetch user ID dynamically or use a known valid ID
        cy.request({
            method: 'GET',
            url: 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((listingResponse) => {
            expect(listingResponse.status).to.equal(200);
            expect(listingResponse.body.data).to.be.an('array').that.is.not.empty;

            // Use the first user ID from the listing response
            const userId = listingResponse.body.data[0].uuid;

            // Prepare invalid token data
            const invalidToken = 'INVALID_TOKEN';
            const updatedUserData = {
                uuid: userId,
                first_name: 'Grace',
                last_name: 'Philip',
                email: 'ezenwathecla90@gmail.com',
                address: '234 United Kingdom',
                phone_number: '+1234567899',
                password: 'go@12345',
                confirm_password: 'go@12345',
                avatar: null,
                is_marketing: 0,
            };

            // Make the request with invalid token
            cy.request({
                method: 'PUT',
                url: editUrlBase + userId,
                form: true,
                body: updatedUserData,
                headers: {
                    Authorization: `Bearer ${invalidToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.include('Unauthorized');
            });
        });
    });
});
