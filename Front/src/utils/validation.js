
export const isAlphabetic = value => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value);

export const isAlphaNumeric = value => /^[0-9A-Za-z]+$/.test(value);

export const isValidEmail = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export const isValidPassword = password => {
  return /^[0-9A-Za-z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/i.test(password);
};
export const isValidPhone = phone => {
  return /^\d{9}$/.test(phone);
};

export const minLength = (value, length) => {
  return value.length >= length;
};