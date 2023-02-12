import express from "express";
import { jwtAuth, jwtAuthAdmin } from "../auth.js";
const router = express.Router();
import user from "../models/user.model.js";
import { getHashedPassword } from "../utils.js";
import uuid4 from "uuid4";

router.get("/", jwtAuthAdmin, async (req, res) => {
  const users = await user.findAll();
  res.render("users", { title: "Users", users });
});

router.post("/create", jwtAuthAdmin, async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  const id = uuid4();

  user
    .create({ id, username, password: hashedPassword })
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      res.status(409).send("User already exists");
    });
});

router.post("/update", jwtAuthAdmin, async (req, res) => {
  const { id, apiToken, tokenSecret } = req.body;

  await user
    .update({ api_token: apiToken, api_secret: tokenSecret }, { where: { id } })
    .then(() => {
      res.status(204).send("User updated");
    })
    .catch((err) => {
      res.status(409).send("User may exists");
    });
});

router.post("/update/password", jwtAuthAdmin, async (req, res) => {
  const { id, password } = req.body;

  const changedPassword = getHashedPassword(password);

  await user
    .update({ password: changedPassword }, { where: { id } })
    .then(() => {
      res.status(204).send("User updated");
    })
    .catch((err) => {
      res.status(409).send("User may exists");
    });
});

router.delete("/delete", jwtAuthAdmin, async (req, res) => {
  const { id } = req.body;

  await user
    .destroy({ where: { id } })
    .then(() => {
      res.status(204).send("User deleted");
    })
    .catch((err) => {
      res.status(409).send("User may exists");
    });
});

export default router;
