describe('Forgot Password Tests', () => {
    const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/user/forgot-password';
  
    // Helper function to perform forgot password request
    const performForgotPasswordRequest = (email) => {
      return cy.request({
        method: 'POST',
        url: apiUrl,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email: email
        },
        failOnStatusCode: false // To handle non-200 responses
      });
    };
  
    it('should send a password reset email for a registered user', () => {
      cy.getNewToken().then((result) => {
        const userEmail = result.email;
  
        performForgotPasswordRequest(userEmail).then((response) => {
          cy.log(`Response: ${JSON.stringify(response.body)}`);
          expect(response.status).to.eq(200); // Status should be 200 OK
          expect(response.body).to.have.property('success').that.equals(1); // Assuming success field should be 1
          
          // Adjust according to actual response structure
          // For example, if message is not present, assert other fields or check for general success
          // expect(response.body).to.have.property('message').that.contains('Password reset email sent');
        });
      });
    });
  
    it('should return an error for an invalid email', () => {
      performForgotPasswordRequest('invalid-email').then((response) => {
        cy.log(`Response: ${JSON.stringify(response.body)}`);
        expect(response.status).to.eq(422); // Assuming invalid email returns 422
        expect(response.body).to.have.property('success').that.equals(0); // Assuming failure field should be 0
  
        // Adjust according to actual response structure
        // expect(response.body).to.have.property('message').that.contains('Invalid email address');
      });
    });
  
    it('should return an error for an empty email field', () => {
      performForgotPasswordRequest('').then((response) => {
        cy.log(`Response: ${JSON.stringify(response.body)}`);
        expect(response.status).to.eq(422); // Assuming empty email returns 422
        expect(response.body).to.have.property('success').that.equals(0); // Assuming failure field should be 0
  
        // Adjust according to actual response structure
        // expect(response.body).to.have.property('message').that.contains('Email is required');
      });
    });
  
    it('should return an error for a malformed email', () => {
      performForgotPasswordRequest('malformed-email').then((response) => {
        cy.log(`Response: ${JSON.stringify(response.body)}`);
        expect(response.status).to.eq(422); // Assuming malformed email returns 422
        expect(response.body).to.have.property('success').that.equals(0); // Assuming failure field should be 0
  
        // Adjust according to actual response structure
        // expect(response.body).to.have.property('message').that.contains('Invalid email format');
      });
    });
  
    it('should return an error if the user is not found', () => {
      performForgotPasswordRequest('nonexistentuser@example.com').then((response) => {
        cy.log(`Response: ${JSON.stringify(response.body)}`);
        expect(response.status).to.eq(404); // Assuming user not found returns 404
        expect(response.body).to.have.property('success').that.equals(0); // Assuming failure field should be 0
  
        // Adjust according to actual response structure
        // expect(response.body).to.have.property('message').that.contains('User not found');
      });
    });
  });
  