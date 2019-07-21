const { db, Pins } = require('./db')
const { green, red } = require('chalk')




const seedPins = [
    {lat: 41.1628731, lng: -73.8615246, formatted_address: 'Ossining, NY, USA', name: "town of ossining"},
    {formatted_address: "Mt Kisco, NY 10549, USA", lat: 41.2042616, lng: -73.72707609999999, name: "mt kisco"},
    {formatted_address: "Yosemite National Park, California, USA", lat: 37.8651011, lng: -119.5383294, name: "yosemite national"},
    {formatted_address: "Acadia National Park, Maine, USA", lat: 44.3385559, lng: -68.2733346, name: "Acadia National Park"},
    {formatted_address: "Appalachia Trailhead, Randolph, NH 03593, USA",lat: 44.3715828,lng: -71.2887873, name: "Appalachia Trailhead, White Mountains"},
    {formatted_address: "Glacier National Park, Montana, USA", lat: 48.7596128, lng: -113.7870225, name: "Glacier National Park"}
]


const seed = async () => {
    console.log(Pins, db)
    try {
      await db.sync({ force: true })
      await Pins.bulkCreate(seedPins)
  
    } catch (err) {
     console.log(red(err))
    }
  }

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
