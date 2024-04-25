import { DataTypes, Sequelize, Model } from "sequelize";
import { CartItem } from "./carItem";

export class Cart extends Model {
  declare id: number;
  declare userId: number;
  declare totalPrice: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare CartItems: CartItem[];
}

export default (sequelize: Sequelize) => {
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "cart",
    }
  );

  return Cart;
};
