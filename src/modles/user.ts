import { DataTypes, Sequelize, Model } from "sequelize";
import { Cart } from "./cart";

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare email: string;
  declare phone: string;
  declare Cart: Cart;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: {
            msg: "邮箱格式不正确",
          },
        },
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^1[3456789]\d{9}$/,
        },
        unique: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "user",
    }
  );

  return User;
};
