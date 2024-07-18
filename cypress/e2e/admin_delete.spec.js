describe('Admin User Management API Tests', () => {
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
  
    it('TS-01: Admin deletes user by ID', () => {
      const userIdToDelete = '4841e496-4117-4af0-8ca0-57dd3066be03'; // Example user ID to delete
  
      cy.request({
        method: 'DELETE',
        url: `https://pet-shop.buckhill.com.hr/api/v1/admin/user-delete/${userIdToDelete}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
      }).then((deleteResponse) => {
        if (deleteResponse.status === 200) {
          expect(deleteResponse.body).to.have.property('message', 'User deleted successfully');
        } else if (deleteResponse.status === 404) {
          // User not found, handle accordingly (optional assertion)
          expect(deleteResponse.body).to.have.property('error', 'User not found');
        } else {
          // Handle other unexpected response statuses (optional assertion)
          expect(deleteResponse.status).to.equal(200); // Example assertion, adjust as per your API behavior
        }
      });
    });
  
    it('TS-02: Admin attempts to delete a non-existent user', () => {
      const nonExistentUserId = 'non-existent-user-id';
  
      cy.request({
        method: 'DELETE',
        url: `https://pet-shop.buckhill.com.hr/api/v1/admin/user-delete/${nonExistentUserId}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404); // Expecting a 404 Not Found
        expect(response.body).to.have.property('error', 'User not found');
      });
    });
  
    it('TS-03: Admin lists all users', () => {
      cy.request({
        method: 'GET',
        url: 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data).to.be.an('array').that.is.not.empty;
        // Add more assertions based on the response schema or expected data
      });
    });
  
    it('TS-04: Admin tries to delete user without authentication token', () => {
      const userIdToDelete = '4841e496-4117-4af0-8ca0-57dd3066be03'; // Example user ID to delete
  
      cy.request({
        method: 'DELETE',
        url: `https://pet-shop.buckhill.com.hr/api/v1/admin/user-delete/${userIdToDelete}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401); // Expecting a 401 Unauthorized
        expect(response.body).to.have.property('error', 'Unauthorized');
      });
    });
  });
  