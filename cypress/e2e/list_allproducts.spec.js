describe('Product Listing API Tests', () => {
    let authToken = '';
  
    before(() => {
      // Retrieve user token before all tests
      cy.getNewToken().then((user) => {
        authToken = user.token;
      });
    });
  
    it('should list all products for the first page with default limit', () => {
      const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/products?page=1&limit=5';
  
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response status:', response.status);
        cy.log('Response body:', JSON.stringify(response.body));
  
        // Check if the response is an object
        expect(response.body).to.be.an('object');
        // Check if the object has a 'data' property that is an array
        expect(response.body).to.have.property('data').that.is.an('array');
        // Check if the array contains objects
        response.body.data.forEach(product => {
          expect(product).to.be.an('object');
          expect(product).to.have.property('uuid');
          expect(product).to.have.property('title');
          expect(product).to.have.property('price');
          expect(product).to.have.property('brand');
          expect(product).to.have.property('category');
        });
      });
    });
  
    it('should list products sorted by price in descending order', () => {
      const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/products?page=1&limit=5&sortBy=price&desc=true';
  
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response status:', response.status);
        cy.log('Response body:', JSON.stringify(response.body));
  
        // Check if the response is an object
        expect(response.body).to.be.an('object');
        // Check if the object has a 'data' property that is an array
        expect(response.body).to.have.property('data').that.is.an('array');
        // Check if the array contains objects
        response.body.data.forEach(product => {
          expect(product).to.be.an('object');
          expect(product).to.have.property('uuid');
          expect(product).to.have.property('title');
          expect(product).to.have.property('price');
          expect(product).to.have.property('brand');
          expect(product).to.have.property('category');
        });
  
        // Additional assertion to check sorting
        const sortedByPrice = response.body.data.slice().sort((a, b) => b.price - a.price);
        expect(response.body.data).to.deep.equal(sortedByPrice);
      });
    });
  
    it('should list products filtered by category', () => {
      const category = 'Electronics'; // Example category
      const apiUrl = `https://pet-shop.buckhill.com.hr/api/v1/products?page=1&limit=5&category=${category}`;
  
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response status:', response.status);
        cy.log('Response body:', JSON.stringify(response.body));
  
        // Check if the response is an object
        expect(response.body).to.be.an('object');
        // Check if the object has a 'data' property that is an array
        expect(response.body).to.have.property('data').that.is.an('array');
        // Check if the array contains objects
        response.body.data.forEach(product => {
          expect(product).to.be.an('object');
          expect(product).to.have.property('uuid');
          expect(product).to.have.property('title');
          expect(product).to.have.property('price');
          expect(product).to.have.property('brand');
          expect(product).to.have.property('category');
          expect(product.category).to.equal(category);
        });
      });
    });
  
    it('should handle pagination correctly', () => {
      const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/products?page=2&limit=5';
  
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response status:', response.status);
        cy.log('Response body:', JSON.stringify(response.body));
  
        // Check if the response is an object
        expect(response.body).to.be.an('object');
        // Check if the object has a 'data' property that is an array
        expect(response.body).to.have.property('data').that.is.an('array');
        // Check if the array contains objects
        response.body.data.forEach(product => {
          expect(product).to.be.an('object');
          expect(product).to.have.property('uuid');
          expect(product).to.have.property('title');
          expect(product).to.have.property('price');
          expect(product).to.have.property('brand');
          expect(product).to.have.property('category');
        });
      });
    });
  
    it('should list products with specific brand', () => {
      const brand = 'Samsung'; // Example brand
      const apiUrl = `https://pet-shop.buckhill.com.hr/api/v1/products?page=1&limit=5&brand=${brand}`;
  
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response status:', response.status);
        cy.log('Response body:', JSON.stringify(response.body));
  
        // Check if the response is an object
        expect(response.body).to.be.an('object');
        // Check if the object has a 'data' property that is an array
        expect(response.body).to.have.property('data').that.is.an('array');
        // Check if the array contains objects
        response.body.data.forEach(product => {
          expect(product).to.be.an('object');
          expect(product).to.have.property('uuid');
          expect(product).to.have.property('title');
          expect(product).to.have.property('price');
          expect(product).to.have.property('brand');
          expect(product).to.have.property('category');
          expect(product.brand).to.equal(brand);
        });
      });
    });
  });
  