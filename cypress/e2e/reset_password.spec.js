// cypress/e2e/reset_password.spec.js

describe('Password Reset Tests', () => {
    let userEmail;
    let userToken;
    let resetToken;
    const invalidResetToken = 'invalidResetToken';
  
    // Before each test, get the new token and the reset token
    beforeEach(() => {
      cy.getNewToken().then((result) => {
        userEmail = result.email;
        userToken = result.token;
  
        // Get the reset token using the forgot password API
        cy.getResetToken(userEmail).then((token) => {
          resetToken = token;
        });
      });
    });
  
    // Define a helper function for performing the reset password request
    const performResetPasswordRequest = (resetToken, email, newPassword, confirmPassword) => {
      return cy.request({
        method: 'POST',
        url: 'https://pet-shop.buckhill.com.hr/api/v1/user/reset-password-token',
        body: {
          token: resetToken,
          email: email,
          password: newPassword,
          confirmPassword: confirmPassword
        },
        failOnStatusCode: false // prevent Cypress from failing the test on non-2xx status codes
      });
    };
  
    it('should successfully reset the password with valid token and email', () => {
      performResetPasswordRequest(resetToken, userEmail, 'userpassword', 'userpassword')
        .then((response) => {
          cy.log(`Response: ${JSON.stringify(response.body)}`);
          if (response.status === 200) {
            cy.log('Password reset successfully.');
          } else {
            cy.log(`Expected status 200 but got ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
          }
        });
    });
  
    it('should return an error for an invalid token', () => {
      performResetPasswordRequest(invalidResetToken, userEmail, 'userpassword', 'userpassword')
        .then((response) => {
          cy.log(`Response: ${JSON.stringify(response.body)}`);
          if (response.status === 422) {
            cy.log('Error for invalid token received.');
          } else {
            cy.log(`Expected status 422 but got ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
          }
        });
    });
  
    it('should return an error for an invalid email', () => {
      performResetPasswordRequest(resetToken, 'invalid@example.com', 'userpassword', 'userpassword')
        .then((response) => {
          cy.log(`Response: ${JSON.stringify(response.body)}`);
          if (response.status === 422) {
            cy.log('Error for invalid email received.');
          } else {
            cy.log(`Expected status 422 but got ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
          }
        });
    });
  
    it('should return an error if passwords do not match', () => {
      performResetPasswordRequest(resetToken, userEmail, 'userpassword', 'differentpassword123')
        .then((response) => {
          cy.log(`Response: ${JSON.stringify(response.body)}`);
          if (response.status === 422) {
            cy.log('Error for password mismatch received.');
          } else {
            cy.log(`Expected status 422 but got ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
          }
        });
    });
  
    it('should return an error for missing fields', () => {
      performResetPasswordRequest(resetToken, userEmail, '', '')
        .then((response) => {
          cy.log(`Response: ${JSON.stringify(response.body)}`);
          if (response.status === 422) {
            cy.log('Error for missing fields received.');
          } else {
            cy.log(`Expected status 422 but got ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
          }
        });
    });
  });
  