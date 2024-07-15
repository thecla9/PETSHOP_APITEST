describe('Admin User Listing API Tests', () => {
    const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing';
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMDg3MDgxLCJ1c2VyX3V1aWQiOiJhZDg4M2QxZi0xMzM5LTM2YTMtYTM1NS02ODYwNjQxY2I3ODAifQ.VYN-fRxgz572o1U7LB2n-OhxyP-r7kdGU_EsleXdubGjjzYr-wcNjSjSeSf-t3cUQzXpdc6pfqkmRK9UcTJ_ymsSeyVmihXGciJYUww7IAh25YivP_Zr7XNsH_uCZ038Zg0-CY2qPHUKKXDywH8a0ewhtpofWrU2o2w1Jf-Bo2io7TBaZqwxrXnkUEPGa4JHmldbXV92VTwcWhPW11Y9bWTfs_k8GjPEQOvegH_7HyeqA4k4xBvZ0rLi3GYOp5jpLPZzIo35DceVV6mtH-No_gz75FwAEgB0CNkAQDW_iQ543PmxwuK6jbi-qHXYwCwSofkc4J8tf8GFu8rh8-LGnA';
  
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
  