import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const router = express.Router();
import user from "../models/user.model.js";
import { getHashedPassword } from "../../utils.js";
import jwt from "jsonwebtoken";

router.get("/", async (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  const userToLogin = await user.findOne({
    where: {
      username,
      password: hashedPassword,
    },
  });

  userToLogin.dataValues.password = null;
  userToLogin.dataValues.loggedIn = true;
  
  if (userToLogin) {
    const authToken = jwt.sign(userToLogin.dataValues, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.cookie("AuthToken", authToken);
    res.redirect("/");
  } else {
    res.render("login", {
      title: "Login",
      message: "Invalid username or password",
      messageClass: "alert-danger",
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie('AuthToken');
  res.clearCookie('connect.sid');
  res.redirect("/login");
});

export default router;
