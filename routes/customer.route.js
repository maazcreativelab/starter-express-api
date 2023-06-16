const express = require('express')
const router = express.Router();
const customerOrdersRoutes = require("./customerOrder.route");
const customerDetailsRoutes = require("./customerDetails.route");
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles_list');

const defaultRoutes = [
    { path: '/order', route: customerOrdersRoutes },
    { path: '/customerDetails', route: customerDetailsRoutes }
    
  ];
  
  defaultRoutes.forEach((route) => {
    router.use(route.path ,verifyRoles(ROLES_LIST.Customer), route.route);
  });
  
  module.exports = router;