import express from "express";
import { jwtAuth } from "../auth.js";
const router = express.Router();
import user from "../models/user.js";
import { getHashedPassword } from "../server.js";

router.get("/", jwtAuth, async (req, res) => {
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

router.post("/update", async (req, res) => {
  const { id, apiToken } = req.body;
  await user.update({apiToken}, {where: {id}}).then(() => {
    res.redirect('/users');
  }).catch(err => {
    res.status(409).send('User may exists');
  });
});

export default router;