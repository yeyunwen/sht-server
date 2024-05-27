import { DataTypes, Sequelize, Model } from "sequelize";

export class Order extends Model {
  declare id: number;
  declare createTime: string;
  declare username: string;
  declare orderNum: number;
  declare payType: number;
  declare totalPrice: number;
  declare productInfo: object;
}

export default (sequelize: Sequelize) => {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      orderNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      payType: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "culture",
    }
  );

  return Order;
};
