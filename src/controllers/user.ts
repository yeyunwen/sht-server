import { RequestHandler } from "express";
import { User } from "@/db";
import { log } from "node:console";
import { encryptMD5 } from "@/utils/encryption";
import { ResCode, SALT, JWT_SECRET } from "@/constant";
import jwt from "jsonwebtoken";

const isPhone = (phone: string) => {
  return /^1[3456789]\d{9}$/.test(phone);
};

export const login: RequestHandler = async (req, res) => {
  const { contact, password } = req.body;
  const where = {
    phone: "",
  };
  if (isPhone(contact)) {
    where.phone = contact;
  }

  const user = await User.findOne({
    where: {
      ...where,
    },
  });

  if (!user) {
    return res.send({
      code: ResCode.BAD_REQUEST,
      msg: "用户不存在",
    });
  }
  if (user.password !== encryptMD5(password)) {
    return res.send({
      code: ResCode.BAD_REQUEST,
      msg: "密码错误",
    });
  }
  const result = user;

  const token = jwt.sign(
    {
      phone: contact,
      username: result.username,
      userId: result.id,
    },
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
  const { userId, username } = req.auth as UserInfo;

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: {
      userId,
      username,
    },
  });
};

export const register: RequestHandler = async (req, res) => {
  const { username, password, phone } = req.body;
  log(username, password, phone);
  try {
    const encryptPassword = encryptMD5(password);
    const result = await User.create({
      username,
      phone,
      password: encryptPassword,
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const getUserList: RequestHandler = async (req, res) => {
  const result = await User.findAll();
  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: result,
  });
};
