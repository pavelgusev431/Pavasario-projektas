import { DataTypes } from "sequelize";
import sq from "../database/sequelize.js";

// Aprašome User modelį
const User = sq.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

// Aprašome Product modelį
const Product = sq.define("Product", { 
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false }
});

// Nustatome ryšį tarp User ir Product
User.hasMany(Product, { foreignKey: "user_id" });
Product.belongsTo(User, { foreignKey: "user_id" });