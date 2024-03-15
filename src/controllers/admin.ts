import { RequestHandler } from "express";
import { Admin } from "@/db";
import { log } from "node:console";
import { encryptMD5 } from "@/utils/encryption";
import { ResCode, SALT, JWT_SECRET } from "@/constant";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const result = await Admin.findOne({
    where: {
      username,
      password: encryptMD5(password),
    },
  });

  const token = jwt.sign(
    { username, roles: ["ADMIN"], userId: result?.dataValues.id },
    JWT_SECRET
  );

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: {
      tokenType: "Bearer",
      accessToken: token,
    },
  });
};

export const getUserInfo: RequestHandler = async (req, res) => {
  log("req.user", req.auth);
  const { userId, username, roles } = req.auth as UserInfo;

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: {
      userId,
      username,
      roles,
    },
  });
};

export const register: RequestHandler = async (req, res) => {
  const { username, password, salt } = req.body;
  log(username, password, salt);
  if (salt !== SALT) {
    res.send("premission error");
    return;
  }
  if (username && password) {
    const encryptPassword = encryptMD5(password);
    const result = Admin.create({
      username,
      password: encryptPassword,
    });
    res.send(result);
  }
};
