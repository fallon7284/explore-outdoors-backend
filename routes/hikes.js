const router = require('express').Router()
const { Hikes } = require('../db')
const cache = require('./middleware/cache')

router.get('/', cache.get, async (req, res, next) => {
    const cacheData = cache.get(req)
    if (cacheData === null){
        try{
            const hikes = await Hikess.findAll()
            cache.set(req, hikes)
            res.send(hikes)
        } catch(error){
            console.log(error)
        }
    }
    else {
        res.send(cacheData)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const hike = await Hikes.findOne({where: {id: req.params.id}})
        res.send(hike)
    }catch(error){
        console.log(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const hikes = await Hikes.bulkCreate(req.body)
        res.status(200).send(hikes)
    } catch(error){
        console.log(error)
    }
})

module.exports = router