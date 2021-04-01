//import
const Users = require('../db')
    //content
module.exports = {
    all: (req, res, next) => {
        Users.findAll()
            .then(users => res.json(users))
            .catch(err => res.json(err.message))
    },
    add: (req, res, next) => {
        const user = req.body.u
        const pass = req.body.p
        Users.create({
                username: user,
                password: pass
            })
            .then(user => res.json(user))
            .catch(err => res.json(err.message))
    },
    update: (req, res, next) => {
        const { id, u, p } = req.body
        Users.update({
                username: u,
                password: p
            }, {
                where: { id: id }
            })
            .then(() => res.json('update finish'))
            .catch(err => res.json(err.message))
    },
    delete: (req, res, next) => {
        const { id } = req.body
        Users.destroy({
                where: { id: id }
            })
            .then(() => res.json('deleted finish'))
            .catch(err => res.json(err.message))
    }
}