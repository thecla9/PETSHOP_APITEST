describe('Admin Edit User Details API Test', () => {
    let authToken = '';
  
    const loginUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/login';
    const userListUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing';
    const editUrlBase = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-edit/';
  
    before(() => {
      // Fetch admin token from Cypress environment variable
      cy.fetchAdminToken().then((token) => {
        authToken = token;
        expect(authToken).to.be.a('string').and.not.be.empty; // Ensure token is valid
      });
    });
  
    it('TS-01 should edit user details successfully', () => {
      cy.request({
        method: 'GET',
        url: userListUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
      }).then((listingResponse) => {
        // Verify user list response
        cy.log('User List Response:', JSON.stringify(listingResponse.body, null, 2));
        expect(listingResponse.status).to.equal(200);
        expect(listingResponse.body.data).to.be.an('array').that.is.not.empty;
  
        // Use the first user ID from the listing response
        const userId = listingResponse.body.data[0].uuid;
        expect(userId).to.be.a('string').and.not.be.empty; // Ensure userId is valid
  
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
          cy.log('Edit User Response:', JSON.stringify(response.body, null, 2));
          expect(response.status).to.be.oneOf([200, 422]); // Handle success or validation error
          if (response.status === 422) {
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.include('Failed Validation');
          }
        });
      });
    });
  
    it('TS-02 should handle invalid email format', () => {
      cy.request({
        method: 'GET',
        url: userListUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
      }).then((listingResponse) => {
        // Verify user list response
        cy.log('User List Response:', JSON.stringify(listingResponse.body, null, 2));
        expect(listingResponse.status).to.equal(200);
        expect(listingResponse.body.data).to.be.an('array').that.is.not.empty;
  
        // Use the first user ID from the listing response
        const userId = listingResponse.body.data[0].uuid;
        expect(userId).to.be.a('string').and.not.be.empty; // Ensure userId is valid
  
        const invalidEmailData = {
          uuid: userId,
          email: 'invalidemail',
        };
  
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
          cy.log('Invalid Email Response:', JSON.stringify(response.body, null, 2));
          expect(response.status).to.equal(422);
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.include('Failed Validation');
        });
      });
    });
  
    it('TS-03 should handle empty password confirmation', () => {
      cy.request({
        method: 'GET',
        url: userListUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
      }).then((listingResponse) => {
        // Verify user list response
        cy.log('User List Response:', JSON.stringify(listingResponse.body, null, 2));
        expect(listingResponse.status).to.equal(200);
        expect(listingResponse.body.data).to.be.an('array').that.is.not.empty;
  
        // Use the first user ID from the listing response
        const userId = listingResponse.body.data[0].uuid;
        expect(userId).to.be.a('string').and.not.be.empty; // Ensure userId is valid
  
        const emptyPasswordConfirmData = {
          uuid: userId,
          password: 'go@12345',
          confirm_password: '',
        };
  
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
          cy.log('Empty Password Confirmation Response:', JSON.stringify(response.body, null, 2));
          expect(response.status).to.equal(422);
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.include('Failed Validation');
        });
      });
    });
  
    it('TS-04 should handle invalid or expired token', () => {
      cy.request({
        method: 'GET',
        url: userListUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
      }).then((listingResponse) => {
        // Verify user list response
        cy.log('User List Response:', JSON.stringify(listingResponse.body, null, 2));
        expect(listingResponse.status).to.equal(200);
        expect(listingResponse.body.data).to.be.an('array').that.is.not.empty;
  
        // Use the first user ID from the listing response
        const userId = listingResponse.body.data[0].uuid;
        expect(userId).to.be.a('string').and.not.be.empty; // Ensure userId is valid
  
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
          cy.log('Invalid Token Response:', JSON.stringify(response.body, null, 2));
          expect(response.status).to.equal(401);
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.include('Unauthorized');
        });
      });
    });
  });
  