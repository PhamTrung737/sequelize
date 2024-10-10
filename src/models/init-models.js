import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _food from  "./food.js";
import _food_type from  "./food_type.js";
import _like_res from  "./like_res.js";
import _orders from  "./orders.js";
import _rate_res from  "./rate_res.js";
import _restaurant from  "./restaurant.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const food = _food.init(sequelize, DataTypes);
  const food_type = _food_type.init(sequelize, DataTypes);
  const like_res = _like_res.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const rate_res = _rate_res.init(sequelize, DataTypes);
  const restaurant = _restaurant.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  food.belongsToMany(users, { as: 'id_user_users_orders', through: orders, foreignKey: "id_food", otherKey: "id_user" });
  restaurant.belongsToMany(users, { as: 'id_user_users', through: like_res, foreignKey: "id_res", otherKey: "id_user" });
  restaurant.belongsToMany(users, { as: 'id_user_users_rate_res', through: rate_res, foreignKey: "id_res", otherKey: "id_user" });
  users.belongsToMany(food, { as: 'id_food_foods', through: orders, foreignKey: "id_user", otherKey: "id_food" });
  users.belongsToMany(restaurant, { as: 'id_res_restaurants', through: like_res, foreignKey: "id_user", otherKey: "id_res" });
  users.belongsToMany(restaurant, { as: 'id_res_restaurant_rate_res', through: rate_res, foreignKey: "id_user", otherKey: "id_res" });
  orders.belongsTo(food, { as: "id_food_food", foreignKey: "id_food"});
  food.hasMany(orders, { as: "orders", foreignKey: "id_food"});
  food.belongsTo(food_type, { as: "id_type_food_type", foreignKey: "id_type"});
  food_type.hasMany(food, { as: "foods", foreignKey: "id_type"});
  like_res.belongsTo(restaurant, { as: "id_res_restaurant", foreignKey: "id_res"});
  restaurant.hasMany(like_res, { as: "like_res", foreignKey: "id_res"});
  rate_res.belongsTo(restaurant, { as: "id_res_restaurant", foreignKey: "id_res"});
  restaurant.hasMany(rate_res, { as: "rate_res", foreignKey: "id_res"});
  like_res.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(like_res, { as: "like_res", foreignKey: "id_user"});
  orders.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(orders, { as: "orders", foreignKey: "id_user"});
  rate_res.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(rate_res, { as: "rate_res", foreignKey: "id_user"});

  return {
    food,
    food_type,
    like_res,
    orders,
    rate_res,
    restaurant,
    users,
  };
}
