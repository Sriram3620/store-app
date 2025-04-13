// Name: Min 20 chars, Max 60 chars
const validateName = (name) => {
  return typeof name === 'string' && name.length >= 20 && name.length <= 60;
};

// Address: Max 400 chars
const validateAddress = (address) => {
  return typeof address === 'string' && address.length <= 400;
};

// Password: 8-16 chars, 1 uppercase, 1 special char
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,16}$/;
  return regex.test(password);
};

// Email: basic validation
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

module.exports = {
  validateName,
  validateAddress,
  validatePassword,
  validateEmail,
};
