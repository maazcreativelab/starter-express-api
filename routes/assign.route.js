const express = require('express')
const router = express.Router();
const { getAssignOrders, getAssignOrder, createAssignOrder, deleteAssignOrder, updateAssignOrder } = require('../controllers/assign.controller')
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
router.get('/',getAssignOrders)
// GET a single CustomerOrders
router.get('/:id',getAssignOrder)
// POST a single CustomerOrders
router.post('/', upload.array('files'),createAssignOrder)
// DELETE a single CustomerOrders
router.delete('/:id',deleteAssignOrder)
// POST a single CustomerOrders
router.patch('/:id',updateAssignOrder)

module.exports = router