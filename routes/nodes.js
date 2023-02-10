import express from "express";
const router = express.Router();
import { promox } from "../proxmox.js";

router.get("/", async (req, res) => {
  const nodes = await promox.nodes.$get();
  const qemuArr = [];
  for (const node of nodes) {
    const theNode = promox.nodes.$(node.node);
    const qemus = await theNode.qemu.$get({ full: true });
    for (const qemu of qemus) {
      // const config = await theNode.qemu.$(qemu.vmid).config.$get();
      qemuArr.push(qemu);
    }
  }
  const lxcArr = [];
  for (const node of nodes) {
    const theNode = promox.nodes.$(node.node);
    const lxcs = await theNode.lxc.$get();
    for (const lxc of lxcs) {
      // const config = await theNode.lxc.$(lxc.vmid).config.$get();
      lxcArr.push(lxc);
    }
  }

  res.render("nodes", { title: "Nodes", nodes, qemuArr, lxcArr });
});

router.post("/qemu/stop", async (req, res) => {
  const { node, vmid } = req.body;
  const theNode = promox.nodes.$(node);
  const theQemu = theNode.qemu.$(vmid);
  await theQemu.status.$post({ status: "stop" });
  res.redirect("/nodes");
});

router.post("/lxc/stop", async (req, res) => {
  const { node, vmid } = req.body;
  console.log(node, vmid);
  const theNode = promox.nodes.$(node);
  const theLxc = theNode.lxc.$(vmid);
  // await theLxc.status.$post({ status: "stop" });
  await theLxc.status.stop.$post();
  res.redirect("/nodes");
});

export default router;
