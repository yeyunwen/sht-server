import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { log } from "console";

const JWT_SECRET = "yyw666";

export const jwtMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.send("premission error!!!");
    return;
  }
  const result = jwt.verify(token, JWT_SECRET);
  if (!result) {
  } else {
    req.auth = result as UserInfo;
    log("result", result);
    next();
  }
};
