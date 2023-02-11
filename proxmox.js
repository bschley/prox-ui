import * as dotenv from "dotenv";
dotenv.config();
import { proxmoxApi } from "proxmox-api";

export const promox = proxmoxApi({
  host: process.env.PROX_HOST,
  username: process.env.PROX_USERNAME,
  password: process.env.PROX_PASSWORD,
});

export default promox;