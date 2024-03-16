import { Sequelize } from "sequelize";
import AdminModel from "@/modles/admin";
import TourismModel from "@/modles/tourism";

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

// sequelize.sync();

export default sequelize;
export { Admin, Tourism };
