const express = require('express');
const router = express.Router();
const cors = require('cors')


router.use(cors())
/* GET home page. */
router.use('/pins', require('./pins'));

router.use('/camps', require('./camps'))

router.use('/hikes', require('./hikes'))

router.use('/boulders', require('./boulders'))

module.exports = router;
