const db = require('./database')
const Sequelize = require('sequelize')

const Camps = db.define('camps', {
    latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    longitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
    },
    numCampsites: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    isCampground: {
        type: Sequelize.BOOLEAN, 
        allowNull: false
    },
    isBookable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = Camps