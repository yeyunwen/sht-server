import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  console.log("sequelize", sequelize.define);

  return sequelize.define(
    "tourism",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      cover: {
        type: DataTypes.STRING,
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
      tourismId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: false,
      tableName: "tourism",
    }
  );
};
