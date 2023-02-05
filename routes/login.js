import express from "express";
const router = express.Router();
import user from "../models/user.js";
import { getHashedPassword } from "../server.js";
import jwt from "jsonwebtoken";

router.get("/", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  const userExists = await user.findOne({
    where: {
      userName,
      password: hashedPassword,
    },
  });

  if (userExists) {
    const authToken = jwt.sign(userExists.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("AuthToken", authToken);
    res.redirect("/nodes");
    return;
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
    res.redirect("/login");
});

export default router;
