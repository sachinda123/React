import { Model, DataTypes, Sequelize } from "sequelize";
interface WishListAttributes {
  id: number;
  movieId: number;
  userId: number;
  movieData: JSON;
}

class List extends Model<WishListAttributes> implements WishListAttributes {
  public id!: number;
  public movieId!: number;
  public userId!: number;
  public movieData!: JSON;

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  List.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      movieId: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      movieData: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "List",
      tableName: "Lists",
      timestamps: false,
    }
  );

  return List;
};
