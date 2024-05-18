import { Model, DataTypes, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string | null;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string | null;
  public lastName!: string | null;
  public email!: string;
  public password!: string | null;

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: false,
    }
  );

  return User;
};
