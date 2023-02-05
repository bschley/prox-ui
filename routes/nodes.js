import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render('nodes', { title: 'Nodes' });
});

export default router;