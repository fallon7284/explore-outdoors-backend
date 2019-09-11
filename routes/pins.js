const router = require('express').Router()
const { Pins } = require('../db')
const cache = require('./middleware/cache')

router.get('/', cache.get, async (req, res, next) => {
    try{
        const pins = await Pins.findAll()
        cache.set(req, pins)
        res.send(pins)
    } catch(error){
        console.log(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const pins = await Pins.create(req.body)
        res.status(200).send(pins)
    } catch(error){
        console.log(error)
    }
})

module.exports = router