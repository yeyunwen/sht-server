import { DataTypes, Sequelize, Model } from "sequelize";

export class Culture extends Model {
  declare id: number;
  declare title: string;
  declare cover: string;
  declare category: number;
  declare description: string;
  declare content: string;
}

export default (sequelize: Sequelize) => {
  Culture.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
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
    },
    {
      sequelize,
      timestamps: false,
      tableName: "culture",
    }
  );

  return Culture;
};
