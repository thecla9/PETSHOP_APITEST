describe('Admin User Listing API Tests', () => {
  const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing';
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMjY1OTk3LCJ1c2VyX3V1aWQiOiJhYTQ0NWMzNC00YTljLTMyYWMtOTc4OC1hMTlhNWVhYjJiMWYifQ.VPXXSgferEbqFn5Ede9MVcIXzYIgU5YPIyOrJAQlhKPlTalHRR1Wd8jS1Tzh1SIICTTZTHJw2sBRnacuJt2f3yUyP-iWyOTOn0wt8r8_DhZkv_RGr2Fp3V5MfPd_JiYbXxmngXHMiBmUMtYPHgjEWOEw6jReol4_sr7-eV54AgMeq03MMSTomFcAw3QjcPOKcD3ZBvfG_NDYfKH0EzQJMcA_-ltdh56ZrUY6Fvh-W7Q-yxvwWsq0B0USyX4qejTGH-v4xq1LZIYPMCagNykuAP--7fJv_JTa27T1Gb3gTjvYrGPCIWYJBGhpcChR4rISyGIOFa2WXstnXyNfg0aMlQ';

  const queryParamsList = [
    { page: 1, limit: 4, sortBy: 'name', desc: true, first_name: 'thecla', email: 'theclaworld+1@gmail.com', address: '5 Adelabu Marsha' },
    { page: 2, limit: 5, sortBy: 'email', desc: false, first_name: 'john', email: 'john.doe@example.com', address: '123 Main St' },
    { page: 1, limit: 10, sortBy: 'created_at', desc: true, first_name: 'jane', email: 'jane.doe@example.com', address: '456 Elm St' },
    { page: 3, limit: 2, sortBy: 'address', desc: false, first_name: 'mary', email: 'mary.jane@example.com', address: '789 Oak St' },
    { page: 1, limit: 6, sortBy: 'last_name', desc: true, first_name: 'alice', email: 'alice.wonder@example.com', address: '101 Pine St' },
  ];

  function getRandomQueryParams() {
    return queryParamsList[Math.floor(Math.random() * queryParamsList.length)];
  }

  it('TS-01: Fetches admin user listing with random filters', () => {
    const queryParams = getRandomQueryParams();

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

  it('TS-05: Get users listing with invalid or expired token', () => {
    const invalidToken = 'INVALID_TOKEN';

    cy.request({
      method: 'GET',
      url: apiUrl,
      headers: {
        'Authorization': `Bearer ${invalidToken}`,
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.error).to.equal('Unauthorized');
    });
  });
});
