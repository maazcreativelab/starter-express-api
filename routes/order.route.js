const express = require('express')
const router = express.Router();
const { getOrders, getOrder, createOrder, deleteOrder, updateOrder ,getPendingOrders} = require('../controllers/order.controller')
// router.use(requireAuth)
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'..', 'uploads')); // Set the destination folder where the files will be saved
  },
  filename: (req, file, cb) => {
    console.log("file name",file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalExtension = file.originalname.split('.').pop();
    const filename = file.fieldname + '-' + uniqueSuffix + '.' + originalExtension;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// GET all CustomerOrders
router.get('/',getOrders)
// GET all CustomerOrders
router.get('/pending',getPendingOrders)
// GET a single CustomerOrders
router.get('/:id',getOrder)
// POST a single CustomerOrders
router.post('/', upload.array('files'),createOrder)
// DELETE a single CustomerOrders
router.delete('/:id',deleteOrder)
// POST a single CustomerOrders
router.patch('/:id',upload.array('files'),updateOrder)

module.exports = router