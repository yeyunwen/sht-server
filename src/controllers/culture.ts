import { RequestHandler } from "express";
import { Culture } from "@/db";
import { ResCode } from "@/constant";

export const getList: RequestHandler = async (req, res) => {
  const { category } = req.query;
  const list = await Culture.findAll({
    where: {
      ...(category && {
        category,
      }),
    },
  });
  console.log("list", list);
  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: {
      list,
    },
  });
};
export const addCulture: RequestHandler = async (req, res) => {
  console.log("req.body", req.body);
  const result = await Culture.create({
    ...req.body,
  });

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
  });
};

export const updateCulture: RequestHandler = async (req, res) => {
  const result = await Culture.update(
    {
      ...req.body,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
  });
};

export const getCultureDetail: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await Culture.findOne({
    where: {
      id,
    },
  });

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: result,
  });
};

export const deleteCulture: RequestHandler = async (req, res) => {
  const { id } = req.body;
  const result = await Culture.destroy({
    where: {
      id,
    },
  });

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
  });
};

export const getRecommendCulture: RequestHandler = async (req, res) => {
  const list = await Culture.findAll({
    where: {
      recommend: 1,
    },
  });
  console.log("list", list);
  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: {
      list,
    },
  });
};
