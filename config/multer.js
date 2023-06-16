const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: 'uploads/', // Set the destination folder for uploaded files
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

module.exports={multer}