import express from "express";
const router = express.Router();
import user from "../models/user.js";
import { getHashedPassword } from "../server.js";

router.get("/", async (req, res) => {
  const users = await user.findAll();
  res.render('users', { title: 'Users', users});
});

router.post("/create", (req, res) => {
  const { userName, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  
  user.create({userName, password: hashedPassword}).then(() => {
    res.redirect('/login');
  }).catch(err => {
    res.status(409).send('User may exists');
  });
});

export default router;