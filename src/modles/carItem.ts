import { DataTypes, Sequelize, Model } from "sequelize";
import { Product } from "./product";

export class CartItem extends Model {
  declare id: number;
  declare cartId: number;
  declare productId: number;
  declare quantity: number;
  declare selected: boolean;
  declare Product: Product;
}

export default (sequelize: Sequelize) => {
  CartItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      selected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "cart_item",
    }
  );

  return CartItem;
};
