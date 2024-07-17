describe('Admin Logout API Test', () => {
    const logoutUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/logout';
    const validToken = Cypress.env('ADMIN_API_TOKEN'); // Get ADMIN_API_TOKEN from .env file

    it('TS-01 should logout successfully', () => {
        cy.request({
            method: 'GET',
            url: logoutUrl,
            headers: {
                Authorization: `Bearer ${validToken}`,
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200); 
            //expect(response.body.message).to.equal('success'); 
        });
    });

    it('TS-02 should handle invalid or expired token', () => {
        const invalidToken = 'INVALID_TOKEN';

        cy.request({
            method: 'GET',
            url: logoutUrl,
            headers: {
                Authorization: `Bearer ${invalidToken}`,
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200); 
     
        });
    });

    it('TS-03 should handle logout without token', () => {
        cy.request({
            method: 'GET',
            url: logoutUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});
