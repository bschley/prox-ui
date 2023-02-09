import express from "express";
import { jwtAuth, jwtAuthAdmin } from "../auth.js";
const router = express.Router();
import user from "../models/user.js";
import { getHashedPassword } from "../utils.js";
import uuid4 from "uuid4";

router.get("/", jwtAuth, jwtAuthAdmin, async (req, res) => {
  const users = await user.findAll();
  res.render('users', { title: 'Users', users});
});

router.post("/create", async (req, res) => {
  const { userName, password, role } = req.body;
  const hashedPassword = getHashedPassword(password);
  const id = uuid4();
  let roleBuffer = role;

  const checkTable = await user.findAll();

  if (checkTable.length === 0) {
    roleBuffer = 'Administrator'
  }
  
  user.create({id, userName, password: hashedPassword, role: roleBuffer}).then(() => {
    res.redirect('/login');
  }).catch(err => {
    res.status(409).send(err);
  });
});

router.post("/update", async (req, res) => {
  const { id, apiToken, tokenSecret } = req.body;
  await user.update({apiToken, tokenSecret}, {where: {id}}).then(() => {
    res.redirect('/users');
  }).catch(err => {
    res.status(409).send('User may exists');
  });
});

export default router;