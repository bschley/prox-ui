import express from "express";
const router = express.Router();
import user from "../models/user.js";

router.get("/", async (req, res) => {
  const users = await user.findAll();
  res.render('users', { title: 'Users', users});
});

router.post("/create", (req, res) => {
  user.create(req.body).then(() => {
    res.send('user created');
  }).catch(err => {
    res.status(409).send('User may exists');
  });
});

export default router;