const router = require('express').Router()
const { Pins } = require('../db')

router.get('/', async (req, res, next) => {
    try{
        const pins = await Pins.findAll()
        res.send(pins)
    } catch(error){
        console.log(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const pins = await Pins.create(req.body)
        console.log(pins)
        res.status(200).send(pins)
    } catch(error){
        console.log(error)
    }
})

module.exports = router