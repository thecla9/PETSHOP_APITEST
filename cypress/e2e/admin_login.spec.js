
    describe('Admin Login API Test', () => {
        let authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMDcyNDYwLCJ1c2VyX3V1aWQiOiJhZDg4M2QxZi0xMzM5LTM2YTMtYTM1NS02ODYwNjQxY2I3ODAifQ.CTG5_c5UBVIS2FaZCAJM116NlAGjejUU_PYfFZ3JovB1KlCPlrxRfUR4hEHxWAIGX7IggkYHGKNIv0c9PC9BCBZlyTmTCmHvxMyWB5v1fwS0c7AWO8A4OqN_L_-fP0HG3HP60Bq1Eynp0WkKOfm_Dk4eT8RVm4RPmFH0WeK_5CVHcnAojF-vBvqMWMMLjj-VVRHOJUQy5-1Ine3BcJ5dGmFyXzvOv7JorokdMDZK3YVTLJStyxTN5tAWZWCq8CaqCZuONWSXEfPlekx6S36OKq5chAUuhsYmJ6w13mAor_R4_j980b0MM_7_IOEF39V5ihqxpj9EXR75-FW2O__tpg';
      
        const loginUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/login';
        const adminCredentials = { email: 'admin@buckhill.co.uk', password: 'admin' };
      
        it('TS-01: Login with the correct credentials', () => {
          cy.request({
            method: 'POST',
            url: loginUrl,
            body: adminCredentials,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data).to.have.property("token");
            authToken = response.body.data.token; // Store the token for subsequent requests
          });
        });
      
        it('TS-02: Incorrect Admin Password', () => {
          cy.request({
            method: 'POST',
            url: loginUrl,
            body: {
              email: 'admin@buckhill.co.uk',
              password: 'wrongpassword'
            },
            failOnStatusCode: false // Allows checking error responses
          }).then(response => {
            expect(response.status).to.equal(422); // Unauthorized status code
            // Add assertions for error message or specific response handling
          });
        });
      
        it('TS-03: Empty Admin Email Field', () => {
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
      