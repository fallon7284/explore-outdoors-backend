const router = require('express').Router()
const { Boulders } = require('../db')
const cache = require('./middleware/cache')
const axios = require('axios')
const trimLatLon = require('./utilities/trimLatLon')


router.get('/', async (req, res, next) => {
    let { minDiff, maxDiff, key } = req.query
    const { lat, lon } = trimLatLon(req.query.lat, req.query.lon)
    req.query.lat = lat
    req.query.lon = lon
    const response = cache.get(req)
    if (response) {
        res.status(200).send(response)
    }
    else {
        try{
            const { data } = await axios.get(`https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=${lon}&maxDistance=50&minDiff=V${minDiff}&maxDiff=V${maxDiff}&key=${key}`)
            const formattedBoulders = data.routes.map(t => {
                const { name, rating, stars, location,
                latitude, longitude, imgSmall, imgMedium, url} = t
                return { name, rating, stars, location,
                    latitude, longitude, imgSmall, imgMedium, url}
            })
            cache.set(req, formattedBoulders)
            res.status(200).send(formattedBoulders)
        }
        catch(error){
            console.log(error)
        }
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