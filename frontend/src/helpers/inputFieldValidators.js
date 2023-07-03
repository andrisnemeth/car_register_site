import '../styles/inputFieldHelper.css'

export const validateName = (name) => {
  const nameRegex = /^([A-ZÀ-ű]([-.,' ])?){5,254}$/i;
  return nameRegex.test(name);
};

export const validateEmail = (email) => {
  const emailRegex =
  /^\p{Ll}+([-+_.!#$%&*=]?\p{Ll}+)*@\p{Ll}+([-.]?\p{Ll}+)*(\.\p{Ll}{2,3})+$/u;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,254}$/;
  return passwordRegex.test(password);
};

export const validateMatch = (password, passwordConf) => {
  if (password === passwordConf) {
    return true;
  } else {
    return false;
  }
};

export const validateBrandName = (brandName) => {
  const nameRegex = /^[A-ZÀ-Űa-zà-ű]{3,}([-][A-ZÀ-Űa-zà-ű]+)*$/;
  return nameRegex.test(brandName);
};
