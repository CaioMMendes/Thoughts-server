import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/conn";
import { user } from "./user";

interface thoughtsInstance extends Model {
  id: number;
  title: string;
}

export const thoughts = sequelize.define<thoughtsInstance>(
  "thoughts",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "thoughts",
    timestamps: false,
  }
);
thoughts.belongsTo(user);
user.hasMany(thoughts);
