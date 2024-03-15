import express, { ErrorRequestHandler } from "express";
import admin from "@/router/admin";
import { errHandler } from "@/middleware";
import { expressjwt } from "express-jwt";
import { JWT_SECRET, unAuthList } from "@/constant";

const app = express();

// Middleware
app.use(express.json());
app.use(
  expressjwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: unAuthList,
  })
);

// Router
app.use("/admin", admin);

// Error
app.use(errHandler);

app.listen(3000, () => {
  console.log("✨Server started on port 3000");
});
