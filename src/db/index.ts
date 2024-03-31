import { Sequelize } from "sequelize";
import AdminModel from "@/modles/admin";
import TourismModel from "@/modles/tourism";
import UserModel from "@/modles/user";
import ProductModel from "@/modles/product";

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

// sequelize.sync();

export default sequelize;
export { Admin, Tourism, User, Product };
