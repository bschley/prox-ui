import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.user)
  res.render("index", { title: "Home" });
});

export default router;
