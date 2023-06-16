const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');
console.log("inside refresh route")
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;