import { RequestHandler } from "express";
import { Tourism } from "@/db";
import { ResCode } from "@/constant";

export const getList: RequestHandler = async (req, res) => {
  const list = await Tourism.findAll();
  console.log("list", list);
  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: {
      list,
    },
  });
};
export const addTourism: RequestHandler = async (req, res) => {
  const { title, cover, content } = req.body;
  const result = await Tourism.create({
    title,
    cover,
    content,
  });

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
  });
};

export const updateTourism: RequestHandler = async (req, res) => {
  const { tourismId, title, cover, content } = req.body;
  const result = await Tourism.update(
    {
      title,
      cover,
      content,
    },
    {
      where: {
        tourismId,
      },
    }
  );
  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
  });
};

export const getTourismDetail: RequestHandler = async (req, res) => {
  const { tourismId } = req.params;
  const result = await Tourism.findOne({
    where: {
      tourismId,
    },
  });

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
    data: result,
  });
};

export const deleteTourism: RequestHandler = async (req, res) => {
  const { tourismId } = req.body;
  const result = await Tourism.destroy({
    where: {
      tourismId,
    },
  });

  res.send({
    code: ResCode.SUCCESS,
    msg: "success",
  });
};
