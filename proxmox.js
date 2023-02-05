
import * as dotenv from "dotenv";
dotenv.config();
import { proxmoxApi } from "proxmox-api";

export const promox = proxmoxApi({
  host: process.env.PROX_HOST,
  tokenID: process.env.PROX_TOKEN_ID,
  tokenSecret: process.env.PROX_TOKEN_SECRET,
});

export default promox;