// cypress/support/constants.js

const staticUserData = {
  firstname: "Thecla",
  last_name: "EzenwaAB",
  email: "ezenwathecla90@gmail.com",
  password: "go@12345",
  password_confirmation: "golive@123",
  avatar: "avatar",
  address: "5 Adelabu Marsha, Lagos",
  phone_number: "+2347023456789",
  marketing: "User marketing preferences"
};

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomPhoneNumber() {
  const countryCode = '+1'; // Replace with your desired country code
  let phoneNumber = '';
  for (let i = 0; i < 10; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return `${countryCode}${phoneNumber}`;
}

function generateRandomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateRandomEmail() {
  return `testuser_${Math.random().toString(36).substring(7)}@example.com`;
}

const dynamicUserData = {
  first_name: generateRandomString(6),
  last_name: generateRandomString(6),
  email: generateRandomEmail(),
  phone_number: generateRandomPhoneNumber(),
  address: `${generateRandomString(10)}, ${generateRandomString(5)}, Country`,
  password: generateRandomString(10),
  password_confirmation: generateRandomString(10),
  avatar: generateRandomUUID(),
  marketing: 'opt-in'
};

module.exports = { staticUserData, dynamicUserData };
