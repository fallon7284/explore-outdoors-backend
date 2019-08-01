const router = require('express').Router()
const { Hikes } = require('../db')

router.get('/', async (req, res, next) => {
    try{
        const hikes = await Hikes.findAll()
        res.send(hikes)
    } catch(error){
        console.log(error)
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