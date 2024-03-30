import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define(
    "admin",
    {
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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: false,
      tableName: "admin",
    }
  );
};
