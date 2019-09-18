const router = require('express').Router()
const { Camps } = require('../db')
const cache = require('./middleware/cache')
const axios = require('axios')

router.get('/', async (req, res, next) => {
    const response = cache.get(req)
    if (response) res.status(200).send(response)
    else {
        try{
            const { lat, lon, key } = req.query
            const { data } = await axios.get(`https://www.hikingproject.com/data/get-campgrounds?lat=${lat}&lon=${lon}&maxResults=50&maxDistance=50&key=${key}`)
            const campgrounds = data.campgrounds.filter(c => {return c.isCampground && c.numCampsites > 0})
            const formattedCampgrounds = campgrounds.map(c => {
            const { imgUrl, name, location, latitude, longitude, isBookable, isCampground, url, numCampsites } = c
            return { imgUrl, name, location, latitude, longitude, isBookable, isCampground, url, numCampsites}
            })
            cache.set(req, formattedCampgrounds)
            res.status(200).send(formattedCampgrounds)
        }catch(error){
            console.log(error)
        }
    }
})




router.get('/:id', cache.get, async (req, res, next) => {
    try{
        const camp = await Camps.findOne({where: {id: req.params.id}})
        res.send(camp)
    }catch(error){
        console.log(error)
    }
}, cache.set)

router.post('/', async (req, res, next) => {
    try{
        const camps = await Camps.bulkCreate(req.body)
        res.status(200).send(camps)
    } catch(error){
        console.log(error)
    }
})

module.exports = router