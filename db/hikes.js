const db = require("./database");
const Sequelize = require("sequelize");

const Hikes = db.define("hikes", {
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
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  ascent: {
    type: Sequelize.INTEGER
  },
  conditionStatus: {
    type: Sequelize.STRING
  },
  descent: {
    type: Sequelize.INTEGER
  },
  difficulty: {
    type: Sequelize.STRING
  },
  high: {
    type: Sequelize.INTEGER
  },
  imgMedium: {
    type: Sequelize.STRING
  },
  length: {
    type: Sequelize.FLOAT
  },
  low: {
    type: Sequelize.INTEGER
  },
  summary: {
    type: Sequelize.TEXT
  }
});

module.exports = Hikes;
