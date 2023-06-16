const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadFolder = path.join(__dirname,'..', 'uploads')
// Configure multer storage
const storage = multer.diskStorage({
  destination: uploadFolder, // Set the destination folder for uploaded files
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});


const upload = multer({storage})
router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    // Access the uploaded file through req.file
    // Perform database operations to save file details in MySQL
    // Send response back to the client
});

module.exports=router