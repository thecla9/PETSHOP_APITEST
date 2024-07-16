describe('Admin Logout API Test', () => {
    const logoutUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/logout';
    const validToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMTM4OTcxLCJ1c2VyX3V1aWQiOiJhNWE4ZWQ3YS1hNDkyLTM2MWMtOTc4YS0xMjA4ZjM1YWEwNGIifQ.E7XwgCFuNabyMjdl5uZluNHPQ3qFlzWptuJgyANDG7_h2nb3vqY7D5lMUDSE1OT14EiWXKZs0krshgGJMOYeONcgTD6uNNpNcOVicvcHLQFSfNj3nEq4Hp0MT5FuhUhaIX-zpOluzc1IPGtsU8oD4AEofmgbc3FWvg3a5wKyNVMboRgOPU0opBzydwfcyHphZIcVEP4F-M_0IFrygZyKM0CcK69oNLYgzHZb81yFy8bJnyW2IYrieXxt2U5Ma6657oU_6bfC4tMvIEQtitUmCYKAqpId3IkmD9YvRSqUvlw_sjXUhI0Jff5IvhE_5xNU1xLSmera9FSnWjbSSjIUhg';

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
