// app/model/User.js
var Sequelize = require('sequelize')
var db = require('./db')
var attributes = {
    username: {
        type: Sequelize.STRING,

    },

    password: {
        type: Sequelize.STRING,
    },

}

var options = {
    freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options