const Sequelize = require('sequelize')

// This code creates a new instance of the Sequelize library and connects it to a MySQL database called 'kashif-gymapp' on the localhost. The username for the database is 'root' and there is no password. The dialect option specifies that the database is MySQL.


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
    host:process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users= require("./user.model.js")(sequelize, Sequelize)
db.customers= require("./customer.model.js")(sequelize, Sequelize)
db.orders= require("./order.model.js")(sequelize, Sequelize)
db.invoices= require("./invoice.model.js")(sequelize, Sequelize)
db.digitizers= require("./digitizer.model.js")(sequelize, Sequelize)
db.assignedOrders= require("./assignedOrder.model.js")(sequelize, Sequelize)


// Relations

db.users.hasOne(db.customers, { foreignKey: 'user_id' });
db.customers.belongsTo(db.users, { foreignKey: 'user_id' });

db.users.hasOne(db.digitizers, { foreignKey: 'user_id' });
db.digitizers.belongsTo(db.users, { foreignKey: 'user_id' });


db.customers.hasMany(db.orders, { foreignKey: 'customer_id' });
db.orders.belongsTo(db.customers, { foreignKey: 'customer_id' });

db.orders.hasOne(db.invoices, { foreignKey: 'order_id' });
db.invoices.belongsTo(db.orders, { foreignKey: 'order_id' });

db.orders.hasOne(db.assignedOrders, { foreignKey: 'order_id' });
db.assignedOrders.belongsTo(db.orders, { foreignKey: 'order_id' });


db.digitizers.hasOne(db.assignedOrders, { foreignKey: 'digitizer_id' });
db.assignedOrders.belongsTo(db.digitizers, { foreignKey: 'digitizer_id' });


module.exports = db;