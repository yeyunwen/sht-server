import { DataTypes, Sequelize, Model } from "sequelize";

export class Product extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare image: string;
  declare category: number;
  declare description: string;
  declare recommend: number;
}

export default (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      recommend: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "product",
    }
  );

  return Product;
};
