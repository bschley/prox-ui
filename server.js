import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { proxmoxApi } from "proxmox-api";
import path from "path";
import loginRouter from "./router/login.js";
import homeRouter from "./router/home.js";

const app = express();
const port = 3000;
app.listen(port);
const pwd = process.env.PWD;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/login", loginRouter);

const promox = proxmoxApi({
  host: process.env.PROX_HOST,
  tokenID: process.env.PROX_TOKEN_ID,
  tokenSecret: process.env.PROX_TOKEN_SECRET,
});

app.get("/2", (req, res) => {
  promox.nodes
    .$("pve")
    .qemu.$get()
    .then((qemu) => {
      console.log("qemu", qemu);
    });

  res.sendFile(path.join(pwd) + "/views/index.html");
});
