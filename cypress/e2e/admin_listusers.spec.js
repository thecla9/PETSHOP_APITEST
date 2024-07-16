describe('Admin User Listing API Tests', () => {
  const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing';
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMTAyNTc2LCJ1c2VyX3V1aWQiOiJhNWE4ZWQ3YS1hNDkyLTM2MWMtOTc4YS0xMjA4ZjM1YWEwNGIifQ.RI02692CXXd3Oksjsyq-4CquvAZjYLtAhGH79O0-kpLaP4fvQsKPOtbuaCFV0NQ9Q6g90GDaGaFbVDNOrv7rk6E6EVyJBsFgrgFfO0ltGveSw7eJdiqzCCNHEgLC1oc7O5hU6Yc3okYKxm9ofH4Xg3P8pktm-QDQrtHg2_LiLNdTd2z4ZG87wwYgnh_sKK2BoryeG-9pZee6LI_unbOmVqmNgO3FL5yi80N_BiQacu5Uk9TkNb0Tpm62lTMvdAdkjHylH6hJezRJGsBSX9Tv1np719_vAuJpdcWn0K2OOsZJ6CU8pAUaQbWj7aPZXoCSIiAKyRp7VvZHuKB-pwNPlA';
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

});
