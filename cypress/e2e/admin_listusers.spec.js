describe('Admin User Listing API Tests', () => {
  const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing';
  const token = Cypress.env('ADMIN_API_TOKEN'); // Get ADMIN_API_TOKEN from .env file
  let tokenExpiry = 0;
  it('TS-01: Fetches admin user listing with specific filters', () => {
    const queryParams = {
      page: 1,
      limit: 4,
      sortBy: 'name',
      desc: true,
      first_name: 'thecla',
      email: 'theclaworld+1@gmail.com',
      address: '5 Adelabu Marsha'
    };

    const queryString = Object.keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    const fullUrl = `${apiUrl}?${queryString}`;

    cy.request({
      method: 'GET',
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data').that.is.an('array');
      const Token = response.body.token;
      tokenExpiry = Date.now() + 3600000; // Assuming the token is valid for 1 hour
    });
  });

  it('TS-02: Fetches admin user listing without filters', () => {
    const fullUrl = `${apiUrl}?page=1&limit=10`;

    cy.request({
      method: 'GET',
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data').that.is.an('array');
    });
  });

  it('TS-03: Handles pagination correctly', () => {
    const page = 2;
    const limit = 5;
    const fullUrl = `${apiUrl}?page=${page}&limit=${limit}`;

    cy.request({
      method: 'GET',
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data').that.is.an('array');
      expect(response.body.data.length).to.be.at.most(limit);
    });
  });

  it('TS-04: Handles sorting by name in descending order', () => {
    const fullUrl = `${apiUrl}?sortBy=name&desc=true`;

    cy.request({
      method: 'GET',
      url: fullUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data').that.is.an('array');
      // Validate sorting logic 
      const sortedNames = response.body.data.map(user => user.name);
      const sorted = sortedNames.slice().sort((a, b) => b.localeCompare(a));
      expect(sortedNames).to.deep.equal(sorted);
    });
  });
  it('TS-05 Get users listing with invalid or expired token', () => {
    const invalidToken = 'INVALID_TOKEN';
    const fullUrl = `${apiUrl}`;

    cy.request({
        method: 'GET',
        url: fullUrl,
        headers: {
            Authorization: `Bearer ${invalidToken}`,
            'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
    }).then((response) => {
        expect(response.status).to.equal(401); 
        expect(response.body.error).to.equal('Unauthorized'); 
    });
});
});
