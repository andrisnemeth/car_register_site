// import { Request, Response, NextFunction } from 'express';
// import status from 'http-status';
// import * as userService from '../services/userService';
const bcrypt = require("bcrypt");
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
  try {
    const { email, username, full_name, password, type_of_user,
      is_active } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Az e-mail cím már foglalt" });
    }

    // Hash the e-mail and password
    const hashedUsername = await bcrypt.hash(password, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
      username: hashedUsername,
      full_name,
      type_of_user,
      is_active,
    });

    await newUser.save();

    return res.status(201).json({ message: "Sikeresen regisztrált!" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = { getAllUsers, registerUser };
