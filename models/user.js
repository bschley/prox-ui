import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const user = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apiToken: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  timestamps: true
});

export default user;