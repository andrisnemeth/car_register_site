import { postRegister } from "../api/users";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateMatch,
} from "./inputFieldValidators";

export const handleSignUp = async (
  email,
  fullName,
  username,
  password,
  passwordConf,
  typeOfUser,
  isActive,
  notifySignUp
) => {
  // Validation logic here...
  const isValidEmail = validateEmail(email);
  const isValidUsername = validateName(username);
  const isValidFullName = validateName(fullName);
  const isValidPassword = validatePassword(password);
  const isMatchedPassword = validateMatch(password, passwordConf);
  if (
    isValidEmail &&
    isValidUsername &&
    isValidFullName &&
    isValidPassword &&
    isMatchedPassword
  ) {
    try {
      await postRegister({
        email,
        fullName,
        username,
        password,
        typeOfUser,
        isActive,
      });
      notifySignUp();
    } catch (error) {
      if (error.message.includes("Fiók már létezik")) {
        // Handle duplicate account error
      }
    }
  }
};
