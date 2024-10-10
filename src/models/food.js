import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class food extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'food_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'food',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_food_type_food",
        using: "BTREE",
        fields: [
          { name: "id_type" },
        ]
      },
    ]
  });
  }
}
