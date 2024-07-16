
describe('Customer Login API Test', () => {
    let authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMTM3MTQ0LCJ1c2VyX3V1aWQiOiJjMWMwODMwMy02MDc2LTQ2ZjYtYTQxNy04MzFmZjhkYTE3NWEifQ.IxEk4HjjFcFuia0NTCxlN_YtNmZ2MsXmw4Xik_cDmxaGMx_5zfVazuhK4jX_t5ssi7xitMY7e_Srdh0oXbbZm7RYepcC1M_tt87t0Dd7DtSQ2ZUTaj3RJKiRPNSm826OkjxOilOPAq5jRV8PG8dAyAv-lmtkicFD5AiabmCe9FlbcbfBTspvqJlnhlIirm9ZYyKbgiLsUMISOCQP5Ow6a0YRM5uZO9xTDCT-qpEe6jgalE8ssd20jlMypJKwIS9_Cwi_KP_CwUajFLSsabRALHnqLCMaTJFr6-CQHW70m3wI-DuOhKHajhBkdcBwWd05-dNDRfvISYKX_V6bbVBbxw';
  
    const loginUrl = 'https://pet-shop.buckhill.com.hr/api/v1/user/login';
    const customerCredentials = { email: 'ezenwathecla90@gmail.com', password: 'golive@123' };
  
    it('TS-01: Login with the correct customer credentials', () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: customerCredentials,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.property("token");
        authToken = response.body.data.token; // Store the token for subsequent requests
      });
    });
  
    it('TS-02: Incorrect customer Password', () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: {
          email: 'ezenwathecla90@gmail.com',
          password: 'wrongpassword'
        },
        failOnStatusCode: false // Allows checking error responses
      }).then(response => {
        expect(response.status).to.equal(422); // Unauthorized status code
        // Add assertions for error message or specific response handling
      });
    });
  
    it('TS-03: Empty customer Email Field', () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: {
          password: 'password123'
        },
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.equal(422); // Bad request status code
        // Add assertions for error message or specific response handling
      });
    });
  });
  