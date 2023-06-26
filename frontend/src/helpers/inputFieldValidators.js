export const validateName = (name) => {
  const nameRegex = /^([A-ZÀ-ű]([-.,' ])?){1,254}$/i;
  return nameRegex.test(name);
};

export const validateEmail = (email) => {
  const emailRegex =
    /^\w+([-+_.!#$%&*=]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/;
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
