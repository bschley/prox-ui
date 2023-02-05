import express from "express";
const router = express.Router();
import { promox } from "../proxmox.js";

router.get("/", async (req, res) => {
  const nodes = await promox.nodes.$get();
  const qemuArr = [];
  for (const node of nodes) {
      const theNode = promox.nodes.$(node.node);
      const qemus = await theNode.qemu.$get({full:true});
      for (const qemu of qemus) {
          const config = await theNode.qemu.$(qemu.vmid).config.$get();
          qemuArr.push({name: config.name, memory: config.memory})
      }
  }
  const lxcArr = [];
  for (const node of nodes) {
      const theNode = promox.nodes.$(node.node);
      const lxcs = await theNode.lxc.$get();
      for (const lxc of lxcs) {
          const config = await theNode.lxc.$(lxc.vmid).config.$get();
          lxcArr.push({hostname: config.hostname, memory: config.memory})
      }
  }

  res.render('nodes', { title: 'Nodes', nodes, qemuArr, lxcArr });
});

export default router;