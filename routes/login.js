import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const router = express.Router();
import user from "../models/user.model.js";
import { getHashedPassword } from "../utils.js";
import jwt from "jsonwebtoken";

router.get("/", async (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  const userToLogin = await user.findOne({
    where: {
      userName,
      password: hashedPassword,
    },
  });
  
  if (userToLogin) {
    const authToken = jwt.sign(userToLogin.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("AuthToken", authToken);
    req.session.AuthToken = authToken;
    req.session.loggedIn = true;
    res.redirect("/nodes");
  } else {
    res.render("login", {
      title: "Login",
      message: "Invalid username or password",
      messageClass: "alert-danger",
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("AuthToken");
  req.session.AuthToken = null;
  req.session.loggedIn = false;
  res.redirect("/login");
});

export default router;
