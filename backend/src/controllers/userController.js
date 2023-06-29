const bcrypt = require("bcrypt");
const { generateToken } = require('../jsonwebtoken');
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

async function registerUser(req, res) {
  console.log('Registration request received:', req.body)
  //input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { email, username, fullName, password, typeOfUser,
      isActive } = req.body;
      console.log(req.body)
    // Check if the email already exists in the database
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
    return res.status(201).json({ message: "Sikeresen regisztrált!", token  });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    return res.status(400).json({ error: 'Az e-mail cím vagy jelszó hibás' });
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(400).json({ error: 'Az e-mail cím vagy jelszó hibás' });
  }

  const token = generateToken({ userId: existingUser._id });
  return res.status(200).json({ message: 'Sikeres bejelentkezés!', token });
}

module.exports = { getAllUsers, registerUser, loginUser};
