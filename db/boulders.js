const db = require("./database");
const Sequelize = require("sequelize");

const Boulders = db.define("boulders", {
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
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  imgSmall: {
    type: Sequelize.STRING
  },
  imgMedium: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.STRING
  },
  stars: {
    type: Sequelize.INTEGER
  }
});

module.exports = Boulders;
