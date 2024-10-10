import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class rate_res extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_res: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'restaurant',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date_rate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rate_res',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
          { name: "id_res" },
        ]
      },
      {
        name: "FK_rate_res_restaurant",
        using: "BTREE",
        fields: [
          { name: "id_res" },
        ]
      },
    ]
  });
  }
}
