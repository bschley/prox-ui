
import { proxmoxApi } from "proxmox-api";

const promox = proxmoxApi({
  host: process.env.PROX_HOST,
  tokenID: process.env.PROX_TOKEN_ID,
  tokenSecret: process.env.PROX_TOKEN_SECRET,
});

export default promox;