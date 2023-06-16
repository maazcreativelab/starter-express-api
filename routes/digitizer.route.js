const express = require('express')
const router = express.Router();
const { getDigitizers, getDigitizer, createDigitizer, deleteDigitizer, updateDigitizer } = require('../controllers/digitizer.controller')



router.get('/',getDigitizers)
// GET a single CustomerOrders
router.get('/:id',getDigitizer)
// POST a single CustomerOrders
router.post('/',createDigitizer)
// DELETE a single CustomerOrders
router.delete('/:id',deleteDigitizer)
// POST a single CustomerOrders
router.patch('/:id',updateDigitizer)

module.exports = router