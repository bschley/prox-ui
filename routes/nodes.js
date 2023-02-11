import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const router = express.Router();
import proxmox from "../proxmox.js";

router.get("/", async (req, res) => {
  const nodes = await proxmox.nodes.$get();
  const qemuArr = [];
  for (const node of nodes) {
    const theNode = proxmox.nodes.$(node.node);
    const qemus = await theNode.qemu.$get({ full: true });
    for (const qemu of qemus) {
      qemuArr.push(qemu);
    }
  }

  const lxcArr = [];
  for (const node of nodes) {
    const theNode = proxmox.nodes.$(node.node);
    const lxcs = await theNode.lxc.$get();
    for (const lxc of lxcs) {
      lxcArr.push(lxc);
    }
  }

  const sortedQemuArr = qemuArr.sort((a, b) => a.vmid - b.vmid);
  const sortedLxcArr = lxcArr.sort((a, b) => a.vmid - b.vmid);

  res.render("nodes", {
    title: "Nodes",
    nodes,
    qemuArr: sortedQemuArr,
    lxcArr: sortedLxcArr,
  });
});

router.post("/qemu/:status", async (req, res) => {
  const status = req.params.status;

  const { vmid } = req.body;

  const theNode = proxmox.nodes.$(process.env.PROX_NODE);
  const theQemu = theNode.qemu.$(vmid);

  switch (status) {
    case "start":
      await theQemu.status.start
        .$post()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      break;
    case "restart":
      await theQemu.status.restart
        .$post()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      break;
    case "shutdown":
      await theQemu.status.shutdown
        .$post()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      break;
    case "stop":
      await theQemu.status.stop
        .$post()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      break;
    default:
      break;
  }
  res.redirect("/nodes");
});

router.post("/lxc/:status", async (req, res) => {
  const status = req.params.status;

  const { vmid } = req.body;

  const theNode = proxmox.nodes.$(process.env.PROX_NODE);
  const theLxc = theNode.lxc.$(vmid);

  switch (status) {
    case "start":
      await theLxc.status.start
        .$post()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      break;
    case "restart":
      await theLxc.status.restart
        .$post()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      break;
    case "shutdown":
      await theLxc.status.shutdown
        .$post()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      break;
    case "stop":
      await theLxc.status.stop
        .$post()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      break;
    default:
      break;
  }
  res.redirect("/nodes");
});

export default router;
