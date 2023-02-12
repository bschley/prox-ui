import * as dotenv from "dotenv";
dotenv.config();
import expressLayouts from "express-ejs-layouts";
import sequelize_fixtures from "sequelize-fixtures";
import cookieParser from "cookie-parser";
import sequelize from "./sequelize.js";
import routes from "./src/routes.js";
import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";

sequelize
  .sync({ force: process.env.RESET_DB === "true" })
  .then(() => {})
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

const app = express();
const port = 3000;
app.listen(port);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);
app.set("views", "./client/views");
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.user = {};
  if (req.cookies.AuthToken) {
    const user = jwt.verify(req.cookies.AuthToken, process.env.JWT_SECRET);
    req.user = user;
    if (req.user) {
      res.locals.user = req.user;
    }
  }
  next();
});

app.use("/", routes.index);
app.use("/login", routes.login);
app.use("/users", routes.users);
app.use("/register", routes.register);
app.use("/nodes", routes.nodes);

app.get("*", (req, res) => {
  res.status(404).send("Page not found: 404");
});

if (process.env.INSTALL === "true") {
  await sequelize.sync({ force: true });

  sequelize_fixtures
    .loadFile("./INSTALL/fixtures.json", sequelize.models)
    .then(() => {
      console.log("Fixtures loaded");
    })
    .then(() => {
      if (process.env.NODE_ENV === "production") {
        fs.rmSync("./INSTALL", { recursive: true, force: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
