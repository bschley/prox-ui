import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import expressLayouts from "express-ejs-layouts";
import indexRoutes from "./routes/index.js";
import loginRoutes from "./routes/login.js";
import usersRoutes from "./routes/users.js";
import registerRoutes from "./routes/register.js";
import nodesRoutes from "./routes/nodes.js";
import sequelize from "./sequelize.js";
import { jwtAuth } from "./auth.js";
import proxmoxApi from "proxmox-api";

export const promox = proxmoxApi({
  host: process.env.PROX_HOST,
  tokenID: process.env.PROX_TOKEN_ID,
  tokenSecret: process.env.PROX_TOKEN_SECRET,
});

export const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db works");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

const app = express();
const port = 3000;
app.listen(port);

app.use(cookieParser());

app.use(function (req, res, next) {
  res.locals.isLoggedIn = req.cookies.AuthToken ? true : false;
  next();
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/login", loginRoutes);
app.use("/users", usersRoutes);
app.use("/register", registerRoutes);
app.use('/nodes', jwtAuth, nodesRoutes);

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});