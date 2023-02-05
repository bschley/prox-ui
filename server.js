import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import loginRouter from "./router/login.js";
import homeRouter from "./router/home.js";

const app = express();
const port = 3000;
app.listen(port);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/login", loginRouter);
