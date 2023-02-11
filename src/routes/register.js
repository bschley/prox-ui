import express from "express";
import { jwtAuth } from "../../auth.js";
const router = express.Router();

router.get("/", jwtAuth, async (req, res) => {
  res.render("register", { title: "Register" });
});

export default router;
