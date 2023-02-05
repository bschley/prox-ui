import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import expressLayouts from "express-ejs-layouts";
import indexRoutes from "./routes/index.js";
import loginRoutes from "./routes/login.js";
import usersRoutes from "./routes/users.js";
import registerRoutes from "./routes/register.js";
import sequelize from "./sequelize.js";

sequelize.sync().then(() => {
  console.log("db works");
}).catch(err => {
  console.log("Unable to connect to the database:", err);
});

const app = express();
const port = 3000;
app.listen(port);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/login", loginRoutes);
app.use("/users", usersRoutes);
app.use("/register", registerRoutes);
