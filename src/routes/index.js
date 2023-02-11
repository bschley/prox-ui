import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.AuthToken) {
    res.cookie("AuthToken", req.session.AuthToken);
  }

  res.render("index", { title: "Home" });
});

export default router;
