const router = require('express').Router()
const { Boulders } = require('../db')
const cache = require('./middleware/cache')

router.get('/', async (req, res, next) => {
    try{
        const boulders = await Boulders.findAll()
        cache.set(req, boulders)
        res.send(boulders)
    } catch(error){
        console.log(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const boulder = await Boulders.findOne({where: {id: req.params.id}})
        res.send(boulder)
    }catch(error){
        console.log(error)
    }
})

router.post('/', cache.get, cache.set, async (req, res, next) => {
    try{
        const boulders = await Boulders.bulkCreate(req.body)
        res.status(200).send(boulders)
    } catch(error){
        console.log(error)
    }
})

module.exports = router