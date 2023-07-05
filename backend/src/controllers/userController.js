const bcrypt = require("bcrypt");
const { generateToken } = require("../jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

async function getAllUsers(req, res) {
  try {
    const data = await User.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);
    if (!data) {
      return res
        .status(400)
        .json({ error: "Nincs felhasználó ezzel az ID-val" });
    }
    res.send(data);
  } catch (error) {
    console.error("Error during getting user by id:", error);
    res.status(500).send();
  }
}

async function registerUser(req, res) {
  console.log("Registration request received:", req.body);
  //input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, username, fullName, password, typeOfUser, isActive } =
      req.body;
    // Checking if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Az e-mail cím már foglalt" });
    }

    if (!password) {
      return res.status(400).json({ error: "A jelszó kötelező" });
    }

    // Hash the e-mail and password
    const hashedUsername = await bcrypt.hash(password, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed username and password
    const newUser = new User({
      email,
      password: hashedPassword,
      username: hashedUsername,
      fullName,
      typeOfUser,
      isActive,
    });

    await newUser.save();

    const token = generateToken(newUser._id);
    return res.status(201).json({ message: "Sikeresen regisztrált!", token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    return res.status(400).json({ error: "Az e-mail cím vagy jelszó hibás" });
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(400).json({ error: "Az e-mail cím vagy jelszó hibás" });
  }
  // Get the user's ID from the existingUser object
  const userId = existingUser.id;
  const token = generateToken({ userId });
  return res
    .status(200)
    .json({ message: "Sikeres bejelentkezés!", token, userId });
}

async function postLogout(req, res) {
  try {
    // Clear user session data
    req.session.destroy();

    // Revoke access token
    const token = req.headers.authorization.split(" ")[1];

    // Clear client-side authentication token if the token is stored as a cookie
    res.clearCookie("token");

    // Redirect to the logout page or the login page
    res.redirect("/logout");
    return res.status(200).json({ message: "A felhasználó sikeresen kijelentkezett" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.sendStatus(500);
  }
}

async function editTypeOfUserById(req, res) {
  console.log(req.params);
  try {
    const { id } = req.params;
    const { typeOfUser } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.typeOfUser = typeOfUser;
    await user.save();

    res.json({ message: "User status updated", user });
  } catch (error) {
    console.error("Error during changing userStatus:", error);
    res.sendStatus(500);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  postLogout,
  editTypeOfUserById,
};
