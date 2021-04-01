//import
const express = require('express');
const router = express.Router();
const Users = require('../db')
const projectcontroller = require('../app/controller');
//content
router.route('/')
    .get(projectcontroller.all)
    .post(projectcontroller.add)
    .put(projectcontroller.update)
    .delete(projectcontroller.delete);
// search
router.post('/search', (req, res, next) => {
        const id = req.body.id
        const username = req.body.username
        const password = req.body.password

        if (username != null && id != null && password != null) {
            Users.findAll({
                    where: { username, id, password }

                })
                .then(user => res.json(user))
                .catch(err => res.json(err.message))

        }
        if (id != null && password == null && username == null) {
            Users.findAll({
                    where: { id }
                })
                .then(user => res.json(user))
                .catch(err => res.json(err.message))
        }
        if (username != null && password === null && id === null) {
            Users.findAll({

                    where: { username }

                })
                .then(user => res.json(user))
                .catch(err => res.json(err.message))
        }
        if (password != null && id === null && username === null) {
            Users.findAll({

                    where: { password }

                })
                .then(user => res.json(user))
                .catch(err => res.json(err.message))
        }

    }),
    // getone id
    router.get('/getone/:id', async(req, res, next) => {
        const { id } = req.params
        try {
            const user = await Users.findAll({
                attributes: ["id", "username", "password"],
                where: { id }
            })
            res.json(user)
        } catch (err) {
            res.json(err.message)
        }
    })
    //export
module.exports = router;