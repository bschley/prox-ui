import express from "express";
const router = express.Router();
import user from "../models/user.js";

router.get("/", (req, res) => {
  res.render('index');
});

router.post("/create", (req, res) => {
  user.create(req.body).then(() => {
    res.send('user created');
  }).catch(err => {
    res.status(409).send('User may exists');
  });
});

export default router;