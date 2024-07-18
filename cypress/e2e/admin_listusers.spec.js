describe('Admin User Listing API Tests', () => {
  const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing';
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMzIyNDU0LCJ1c2VyX3V1aWQiOiJiMTExYmZiNC02M2ZiLTNjZTctOGYwNS1mYmVjNDc1OTAwZTIifQ.rtu6FB6WYxYJWCKKgF9jyCRLY6G7W3vAiR0XWgCSTlZN-eUDrsBiDEYkl3a2myrNiIXfQkCQQ3MG9BAkNUKzq1VhNY5iqubdUIhwkxhSp19pTtvF4vd_0hz8ET3Pu-L4KT0G34Zi-Gk2uePs1nK3PhCryEDG5EvVx7jxmxo3NHvdMmS6zdmj3YA4MdyBwPGoEeZYTneqO3AGFQpC536eYCPpcBdfyp1H9swBBhrijNanuNRE6gOms5zqtTJ5WmbTWc99h-qP_Bq3qY2ztHMA8t1CvLJpccSjFr-WTMuoYM0oxmVwxU9HccuDR7J6WSyRMfumdbVRYI8Fy8VDKYJWZA'; 

  const queryParamsList = [
    { page: 1, limit: 4, sortBy: 'name', desc: true, first_name: 'thecla', email: 'theclaworld+1@gmail.com', address: '5 Adelabu Marsha' },
    // Add other test cases as needed
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
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('data').that.is.an('array');
    });
  });

  // Add other test cases (TS-02, TS-03, TS-04) similarly...

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
