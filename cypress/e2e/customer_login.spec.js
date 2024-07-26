describe('Customer Login API Test', () => {
  let customerEmail;

  before(() => {
    // Perform admin login, fetch user email, and perform user login
    cy.getNewToken().then((result) => {
      customerEmail = result.email;
      expect(customerEmail).to.be.a('string');
      cy.wrap(customerEmail).as('customerEmail');
    });
  });

  it('TS-01: Login with the correct customer credentials', function() {
    cy.get('@customerEmail').then(email => {
      cy.request({
        method: 'POST',
        url: 'https://pet-shop.buckhill.com.hr/api/v1/user/login',
        body: {
          email: email,
          password: 'userpassword'
        },
        failOnStatusCode: false
      }).then(response => {
        cy.log('Response:', JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('data');
      });
    });
  });

  it('TS-02: Incorrect customer Password', function() {
    cy.get('@customerEmail').then(email => {
      cy.request({
        method: 'POST',
        url: 'https://pet-shop.buckhill.com.hr/api/v1/user/login',
        body: {
          email: email,
          password: 'wrongpassword'
        },
        failOnStatusCode: false
      }).then(response => {
        cy.log('Response:', JSON.stringify(response.body));
        expect(response.status).to.equal(422);
        expect(response.body).to.have.property('error');
      });
    });
  });

  it('TS-03: Empty customer Email Field', () => {
    cy.request({
      method: 'POST',
      url: 'https://pet-shop.buckhill.com.hr/api/v1/user/login',
      body: {
        password: 'userpassword'
      },
      failOnStatusCode: false
    }).then(response => {
      cy.log('Response:', JSON.stringify(response.body));
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property('error');
    });
  });

  it('TS-04: Empty customer Password Field', function() {
    cy.get('@customerEmail').then(email => {
      cy.request({
        method: 'POST',
        url: 'https://pet-shop.buckhill.com.hr/api/v1/user/login',
        body: {
          email: email
        },
        failOnStatusCode: false
      }).then(response => {
        cy.log('Response:', JSON.stringify(response.body));
        expect(response.status).to.equal(422);
        expect(response.body).to.have.property('error');
      });
    });
  });
});
