const Sequelize = require('sequelize');
const db = require('./db');

const Gig = db.define('tin_phan_anh', {
    // id: {
    //     type: Sequelize.STRING
    // },
    tieu_de: {
        type: Sequelize.STRING
    },
    hinh_anh: {
        type: Sequelize.STRING
    },
    chi_tiet_tin: {
        type: Sequelize.STRING
    }
    // budget: {
    //     type: Sequelize.STRING
    // },
    // contact_email: {
    //     type: Sequelize.STRING
    // }
})

module.exports = Gig;