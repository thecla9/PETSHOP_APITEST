describe('Create Payment API Test', () => {
    let authToken = '';
  
    before(() => {
      // Retrieve user token before all tests
      cy.getNewToken().then((user) => {
        authToken = user.token;
      });
    });
  
    const paymentTypes = [
      {
        type: 'credit_card',
        details: {
          card_number: '4111111111111111',
          expiry_date: '12/25',
          cvv: '123'
        }
      },
      {
        type: 'bank_transfer',
        details: {
          bank_name: 'Bank of Test',
          iban: '1234567890',
          routing_number: '987654321'
        }
      },
      {
        type: 'cash_on_delivery',
        details: {
          shipping_address: {
            street: '2 Larry street',
            city: 'Lagos',
            country: 'Nigeria'
          }
        }
      }
    ];
  
    paymentTypes.forEach(payment => {
      it(`should successfully create a payment with ${payment.type}`, () => {
        const apiUrl = 'https://pet-shop.buckhill.com.hr/api/v1/payment/create';
  
        const payload = {
          type: payment.type,
          details: payment.details
        };
  
        cy.request({
          method: 'POST',
          url: apiUrl,
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: payload
        }).then((response) => {
          expect(response.status).to.equal(200);
          const data = response.body.data;
          expect(data).to.have.property('uuid').that.is.a('string');
        });
      });
    });
  });
  