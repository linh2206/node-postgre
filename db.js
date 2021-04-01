//import
const Sequelize = require('sequelize');

module.exports = new Sequelize('demoDB', 'postgres', 'linh2206', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
// db.authenticate()
//     .then(() => console.log('ket noi thanh cong'))
//     // .then(() => db.query("INSERT INTO  Users "))
//     // .then(() => db.query("SELECT * FROM tin_phan_anh"))
//     // .then(results => console.table(results.rows))
//     .catch(err => console.log(err.message))

// create table
// const Users = db.define('User', {
//     username: sequelize.STRING,
//     password: sequelize.STRING
// })
// db.sync()
//     .then(() => console.log('tao thanh cong'))
// module.exports = Users;