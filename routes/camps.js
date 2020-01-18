const router = require("express").Router();
const { Camps } = require("../db");
const cache = require("./middleware/cache");
const axios = require("axios");
const trimLatLon = require("./utilities/trimLatLon");

router.get("/", async (req, res, next) => {
  let { key } = req.query;
  const { lat, lon } = trimLatLon(req.query.lat, req.query.lon);
  req.query.lat = lat;
  req.query.lon = lon;
  const response = cache.get(req);
  if (response) {
    res.status(200).send(response);
  } else {
    try {
      const { data } = await axios.get(
        `https://www.hikingproject.com/data/get-campgrounds?lat=${lat}&lon=${lon}&maxResults=50&maxDistance=50&key=${key}`
      );
      const campgrounds = data.campgrounds.filter(c => {
        return c.isCampground;
      });
      const formattedCampgrounds = campgrounds.map(c => {
        const {
          imgUrl,
          name,
          location,
          latitude,
          longitude,
          isBookable,
          isCampground,
          url,
          numCampsites
        } = c;
        return {
          imgUrl,
          name,
          location,
          latitude,
          longitude,
          isBookable,
          isCampground,
          url,
          numCampsites
        };
      });
      cache.set(req, formattedCampgrounds);
      res.status(200).send(formattedCampgrounds);
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const camp = await Camps.findOne({ where: { id: req.params.id } });
    res.send(camp);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", cache.get, cache.set, async (req, res, next) => {
  try {
    const camps = await Camps.bulkCreate(req.body);
    res.status(200).send(camps);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
