const router = require('express').Router()
const { Camps } = require('../db')
const cache = require('./middleware/cache')

router.get('/', async (req, res, next) => {
    try{
        const camp = await Camps.findAll()
        cache.set(req, camp)
        res.send(camp)
    } catch(error){
        console.log(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const camp = await Camps.findOne({where: {id: req.params.id}})
        res.send(camp)
    }catch(error){
        console.log(error)
    }
})

router.post('/', cache.get, cache.set, async (req, res, next) => {
    try{
        const camps = await Camps.bulkCreate(req.body)
        res.status(200).send(camps)
    } catch(error){
        console.log(error)
    }
})

module.exports = router