import { RequestHandler } from "express";
import { Product } from "@/db";
import { ResCode } from "@/constant";

export const getList: RequestHandler = async (req, res) => {
  const { category } = req.query;
  const list = await Product.findAll({
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
export const addProduct: RequestHandler = async (req, res) => {
  console.log("req.body", req.body);
  const result = await Product.create({
    ...req.body,
  });

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
  });
};

export const updateProduct: RequestHandler = async (req, res) => {
  const result = await Product.update(
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

export const getProductDetail: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findOne({
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

export const deleteProduct: RequestHandler = async (req, res) => {
  const { tourismId } = req.body;
  const result = await Product.destroy({
    where: {
      tourismId,
    },
  });

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
  });
};

export const getRecommendProduct: RequestHandler = async (req, res) => {
  const list = await Product.findAll({
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
