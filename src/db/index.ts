import { Sequelize } from "sequelize";
import AdminModel from "@/modles/admin";
import TourismModel from "@/modles/tourism";
import UserModel from "@/modles/user";
import ProductModel from "@/modles/product";
import CartModel from "@/modles/cart";
import CartItemModel from "@/modles/carItem";
import CultureModel from "@/modles/culture";
import TestModel from "@/modles/test";

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "sht-manage",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "123456",
});

const Admin = AdminModel(sequelize);
const Tourism = TourismModel(sequelize);
const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const Cart = CartModel(sequelize);
const CartItem = CartItemModel(sequelize);
const Culture = CultureModel(sequelize);

const Test = TestModel(sequelize);

User.hasOne(Cart, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});
Cart.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

Product.belongsToMany(Cart, { through: CartItem, foreignKey: "productId" });
Cart.belongsToMany(Product, { through: CartItem, foreignKey: "cartId" });

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

export default sequelize;
export { Admin, Tourism, User, Product, Cart, CartItem, Culture, Test };
