import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define(
    "user",
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
      timestamps: false,
      tableName: "user",
    }
  );
};
