import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/conn";

export interface userInstance extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const user = sequelize.define<userInstance>(
  "user",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);
