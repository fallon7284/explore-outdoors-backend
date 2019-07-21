const db = require('./database')
const Sequelize = require('sequelize')

const Pins = db.define('pins', {
    lat: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    lng: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    formatted_address: {
        type: Sequelize.STRING,
    }
})

module.exports = Pins