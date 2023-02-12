import * as dotenv from "dotenv";
dotenv.config();
import { proxmoxApi } from "proxmox-api";

export const proxmox = (tokenID, tokenSecret) => proxmoxApi({
  host: process.env.PROX_HOST,
  tokenID,
  tokenSecret,
});

export default proxmox;
