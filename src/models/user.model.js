import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_token: {
      type: DataTypes.STRING,
      unique: true,
    },
    api_secret: {
      type: DataTypes.STRING,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "NA",
    },
  },
  {
    timestamps: true,
  }
);

export default user;
