const router = require('express').Router()

router.get('/', (req, res, next) => {
    const pins = require('../db/mockDbPins')
    console.log(pins)
    res.send(pins)
})

router.post('/', (req, res, next) => {
    const pins = require('../db/mockDbPins')
    console.log(req, 'this is the request')
    pins.push(req.body)
    res.send(pins)
})

module.exports = router