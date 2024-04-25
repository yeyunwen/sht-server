import { Product, Cart, CartItem, Culture } from "@/db";
import { SyncOptions } from "sequelize";
import { log } from "console";

const mode = process.argv[2].split("=")[1];

log("mode", mode);
// Cart.sync({ [mode]: true })
//   .then(() => {
//     log("✅-----sync success------");
//   })
//   .catch((err) => {
//     log("❌-----sync error------");
//     log("err", err);
//   });
// CartItem.sync({ [mode]: true })
//   .then(() => {
//     log("✅-----sync success------");
//   })
//   .catch((err) => {
//     log("❌-----sync error------");
//     log("err", err);
//   });

await Culture.sync({ [mode]: true }).catch((err) => {
  log("❌-----sync error------");
  log("err", err);
});
log("✅-----sync success------");
