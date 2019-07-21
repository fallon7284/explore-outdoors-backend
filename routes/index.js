const express = require('express');
const router = express.Router();
const cors = require('cors')


router.use(cors())
/* GET home page. */
router.use('/pins', require('./pins'));

module.exports = router;
