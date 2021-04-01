// app/model/models.js
var UserMeta = require('./configUser.js'),
    connection = require('./db')

var User = connection.define('users', UserMeta.attributes, UserMeta.options)

// you can define relationships here

module.exports.User = User