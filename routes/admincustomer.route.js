const express = require('express')
const router = express.Router();
const  { getCustomers,getCustomer,createCustomer,deleteCustomer, updateCustomer } =require('../controllers/customer.controller')
// router.use(requireAuth)


router.get('/',getCustomers)

router.get('/:id',getCustomer)

router.post('/',createCustomer)

router.delete('/:id',deleteCustomer)

router.patch('/:id',updateCustomer)

module.exports = router