const express = require('express')
const router = express.Router();
const  { getCustomerDetail, updateCustomerDetail } =require('../controllers/customerDetails.controller')
// router.use(requireAuth)


router.get('/',getCustomerDetail)

// router.get('/:id',getCustomerDetail)

// router.post('/',createCustomerDetail)

// router.delete('/:id',deleteCustomerDetail)

router.patch('/:id',updateCustomerDetail)

module.exports = router