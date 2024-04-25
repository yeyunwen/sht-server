import express from "express";
import admin from "@/router/admin";
import files from "@/router/files";
import tourism from "@/router/tourism";
import user from "@/router/user";
import product from "@/router/product";
import cart from "@/router/cart";
import culture from "@/router/culture";
import { errHandler } from "@/middleware";
import { expressjwt } from "express-jwt";
import { JWT_SECRET, unAuthList } from "@/constant";
import { host } from "@/config";
import cors from "cors";
import { log } from "node:console";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  expressjwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: unAuthList,
  })
);

// Static
app.use(express.static("public"));

// Router
app.use("/admin", admin);
app.use("/files", files);
app.use("/tourism", tourism);
app.use("/user", user);
app.use("/product", product);
app.use("/cart", cart);
app.use("/culture", culture);

app.use('/test', (req, res) => {
  log(req)
})

// Error
app.use(errHandler);

app.listen(host, () => {
  console.log(`✨Server started on port ${host}✨`);
});
