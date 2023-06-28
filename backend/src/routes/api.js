import * as userController from "../controllers/userController";

const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/users", userController.getAllUsers);
