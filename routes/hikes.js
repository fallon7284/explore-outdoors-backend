const router = require('express').Router()
const { Hikes } = require('../db')
const cache = require('./middleware/cache')
const axios = require('axios')

router.get('/', async (req, res, next) => {
    const response = cache.get(req, res, next)
    if (response) res.status(200).send(response)
    else {
        try{
            const {lat, lon, key} = req.query
            const { data } = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxResults=75&minStars=4&minLength=5&maxDistance=50&key=${key}`)
            const formattedHikes = data.trails.map(h => {
                const { 
                    ascent, conditionDetails, conditionStatus, 
                    descent, difficulty, high, imgMedium, latitude,
                    length, location, longitude, low, name, summary, url} = h
                return { 
                    ascent, conditionDetails, conditionStatus, 
                    descent, difficulty, high, imgMedium, latitude,
                    length, location, longitude, low, name, summary, url}
            })
            cache.set(req, formattedHikes)
            res.status(200).send(formattedHikes)
        }
        catch(error){
            console.log(error)
        }
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

router.post('/', cache.get, cache.set, async (req, res, next) => {
    try{
        const hikes = await Hikes.bulkCreate(req.body)
        res.status(200).send(hikes)
    } catch(error){
        console.log(error)
    }
})

module.exports = router