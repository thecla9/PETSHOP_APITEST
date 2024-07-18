describe('View User Account API Test', () => {
  it('should successfully fetch the user account details', () => {
    // Token for accessing user account details
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNzIxMzIyNDU0LCJ1c2VyX3V1aWQiOiJiMTExYmZiNC02M2ZiLTNjZTctOGYwNS1mYmVjNDc1OTAwZTIifQ.rtu6FB6WYxYJWCKKgF9jyCRLY6G7W3vAiR0XWgCSTlZN-eUDrsBiDEYkl3a2myrNiIXfQkCQQ3MG9BAkNUKzq1VhNY5iqubdUIhwkxhSp19pTtvF4vd_0hz8ET3Pu-L4KT0G34Zi-Gk2uePs1nK3PhCryEDG5EvVx7jxmxo3NHvdMmS6zdmj3YA4MdyBwPGoEeZYTneqO3AGFQpC536eYCPpcBdfyp1H9swBBhrijNanuNRE6gOms5zqtTJ5WmbTWc99h-qP_Bq3qY2ztHMA8t1CvLJpccSjFr-WTMuoYM0oxmVwxU9HccuDR7J6WSyRMfumdbVRYI8Fy8VDKYJWZA';

    // Define the API URL for fetching user account details
    const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/user';

    // Make the API request with the token in the headers
    cy.request({
      method: 'GET',
      url: apiUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.equal(200);

      // Assert the response body data against expected values
      const data = response.body.data;
      expect(data.uuid).to.equal('b111bfb4-63fb-3ce7-8f05-fbec475900e2');
      expect(data.first_name).to.equal('Sydney');
      expect(data.last_name).to.equal('Sanford');
      expect(data.email).to.equal('admin@buckhill.co.uk');
      expect(data.email_verified_at).to.equal('2024-07-18T00:00:25.000000Z');
      expect(data.avatar).to.equal('3e5ebe6a-9e52-33a7-affc-07a904b83d98');
      expect(data.address).to.equal('938 Stoltenberg Garden Apt. 165\nStarkland, NH 85794');
      expect(data.phone_number).to.equal('213-991-9316');
      expect(data.is_marketing).to.equal(0);
  });
});
});
