describe('Admin Edit User Details API Test', () => {
    const userId = '3b26daaf-044e-4a97-b330-47e535d84326'; // User ID to edit
    const editUrl = `https://pet-shop.buckhill.com.hr/api/v1/admin/user-edit/${userId}`;
    let token = Cypress.env('ADMIN_API_TOKEN'); // Get ADMIN_API_TOKEN from .env file
    let tokenExpiry = 0;

    const reauthenticateAndGetToken = () => {
        cy.request({
            method: 'POST',
            url: 'https://pet-shop.buckhill.com.hr/api/v1/admin/login',
            body: {
                email: 'admin@buckhill.co.uk',
                password: 'admin',
            },
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            if (response.status === 200) {
                token = response.body.token;
                tokenExpiry = Date.now() + (response.body.expires_in * 36000); // Expires_in is usually in seconds
            } else {
                throw new Error('Failed to reauthenticate and get token');
            }
        });
    };

    beforeEach(() => {
        if (Date.now() > tokenExpiry) {
            reauthenticateAndGetToken(); // Re-authenticate and get a new token if current token is expired
        }
    });

    it('TS-01 should edit user details successfully', () => {
        const updatedUserData = {
            uuid: userId,
            first_name: 'Grace',
            last_name: 'Philip',
            email: 'ezenwathecla90+4@gmail.com',
            address: '234 United Kingdom',
            phone_number: '+1234567899',
            password: 'go@12345',
            confirm_password: 'go@12345',
            is_marketing: 0,
        };

        cy.request({
            method: 'PUT',
            url: editUrl,
            form: true,
            body: updatedUserData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200);
            // Add more assertions for successful update if needed
        });
    });

    it('TS-02 should handle invalid email format', () => {
        const invalidEmailData = {
            uuid: userId,
            email: 'invalidemail', // Invalid email format
        };

        cy.request({
            method: 'PUT',
            url: editUrl,
            form: true,
            body: invalidEmailData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(422);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.include('failed Validation');
        });
    });

    it('TS-03 should handle empty password confirmation', () => {
        const emptyPasswordConfirmData = {
            uuid: userId,
            password: 'go@12345',
            confirm_password: '', // Empty password confirmation
        };

        cy.request({
            method: 'PUT',
            url: editUrl,
            form: true,
            body: emptyPasswordConfirmData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(422);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.include('Failed Validation');
        });
    });

    it('TS-04 should handle invalid or expired token', () => {
        const invalidToken = 'INVALID_TOKEN';
        const updatedUserData = {
            uuid: userId,
            first_name: 'Grace',
            last_name: 'Philip',
            email: 'ezenwathecla90+4@gmail.com',
            address: '234 United Kingdom',
            phone_number: '+1234567899',
            password: 'go@12345',
            confirm_password: 'go@12345',
            avatar: null,
            is_marketing: 0,
        };

        cy.request({
            method: 'PUT',
            url: editUrl,
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
