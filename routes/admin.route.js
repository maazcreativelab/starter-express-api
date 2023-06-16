const express = require('express')
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles_list');
const OrdersRoutes = require("./order.route")
const DigitizerRoutes = require("./digitizer.route")
const CustomerRoutes = require("./admincustomer.route")
const AssignRoutes = require("./assign.route")

const defaultRoutes = [
    { path: '/order', route: OrdersRoutes },
    { path: '/digitizer', route: DigitizerRoutes },
    { path: '/customer', route: CustomerRoutes },
    { path: '/assign', route: AssignRoutes }
    
  ];
  
  defaultRoutes.forEach((route) => {
    router.use(route.path,verifyRoles(ROLES_LIST.Admin), route.route);
  });
  
  module.exports = router;