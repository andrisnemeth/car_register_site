const { body } = require("express-validator");

const registrationValidationRules = [
  body("email").isEmail().withMessage("Nem helyes e-mail cím"),
  body("username").isLength({ min: 5 }).withMessage("Felhasználónévnek legalább 5 karakter hosszúnak kell lennie"),
  body("fullName").isLength({ min: 6 }).withMessage("Teljes névnek legalább 6 karakter hosszúnak kell lennie"),
  body("password").isLength({ min: 8 }).withMessage("A jelszónak legalább 8 karakter hosszúnak kell lennie"),
];

module.exports = { registrationValidationRules };