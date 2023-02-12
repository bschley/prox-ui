import * as dotenv from "dotenv";
dotenv.config();
import { proxmoxApi } from "proxmox-api";
import user from "./src/models/user.model.js";

export const proxmox = async (req, res, next) => {
  try {
    const userData = await user.findOne({ where: { username: req.user.username  } });  
    req.proxmox = proxmoxApi({
      host: process.env.PROX_HOST,
      tokenID: userData.dataValues.api_token,
      tokenSecret: userData.dataValues.api_secret,
    });
    next();
  } catch (err) {
    console.log(err);
  }
};