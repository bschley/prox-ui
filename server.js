import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import expressLayouts from "express-ejs-layouts";
import sequelize_fixtures from "sequelize-fixtures";
import registerRoutes from "./src/routes/register.js";
import indexRoutes from "./src/routes/index.js";
import loginRoutes from "./src/routes/login.js";
import usersRoutes from "./src/routes/users.js";
import nodesRoutes from "./src/routes/nodes.js";
import cookieParser from "cookie-parser";
import SQLiteStore from "connect-sqlite3";
import sequelize from "./sequelize.js";
const Store = new SQLiteStore(session);
import session from "express-session";
import { jwtAuth } from "./auth.js";
import cors from "cors";

// TODO: server.js clean up :)

sequelize
  .sync({ force: false })
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


app.use(
  session({
    store: new Store({
      dir: "./db",
      db: "sessions.db",
      table: "sessions",
      concurrentDB: true,
    }),
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use("/", indexRoutes);
app.use("/login", loginRoutes);
app.use("/users", usersRoutes);
app.use("/register", registerRoutes);
app.use("/nodes", jwtAuth, nodesRoutes);

app.use(express.static("public"));

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
        fs.rmSync('./INSTALL', { recursive: true, force: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}