const dotenv = require('dotenv');
dotenv.config();

Cypress.env('USER_API_TOKEN', process.env.USER_API_TOKEN);
Cypress.env('ADMIN_API_TOKEN', process.env.ADMIN_API_TOKEN);

console.log('User API Token:', Cypress.env('USER_API_TOKEN'));
console.log('Admin API Token:', Cypress.env('ADMIN_API_TOKEN'));
