//import
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport')
const local = require('passport-local').Strategy
const fs = require('fs')
const session = require('express-session');
const app = express();
// import file routes config 
// const projects = require('./app/router');
// set up morgan
app.use(morgan('dev'));
//set up bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
// routes
// app.use('/', projects);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: "mysecret",
    cookie: {
        maxAge: 1000 * 60 * 1
    }
}))
passport.use(new local(
    (username, password, done) => {
        fs.readFile('./userDB.json', (err, data) => {
            const Db = JSON.parse(data)
            const userRecord = Db.find(user => user.usr == username)
            if (userRecord && userRecord.pwd == password) {
                return done(null, userRecord)
            } else {
                return done(null, false)
            }
        })
    }
))
passport.serializeUser((user, done) => {
    done(null, user.usr)
})
passport.deserializeUser((name, done) => {
    fs.readFile('./userDB.json', (err, data) => {
        const Db = JSON.parse(data)
        const userRecord = Db.find(user => user.usr == name)
        if (userRecord) {
            return done(null, userRecord)
        } else {
            return done(null, false)
        }
    })

})
app.use(passport.initialize())
app.use(passport.session())

app.route('/')
    .get((req, res) => res.render('index'))
    .post(passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/loginok'
    }))
    // app.get('/loginok', function checkAuthentication(req, res, next) {
    //     if (req.isAuthenticated()) {
    //         res.render('acopy.ejs', )
    //     } else {
    //         res.redirect("/");
    //     }
    // });
app.get('/loginok', (req, res) => {
    if (req.isAuthenticated()) {

        pool.connect(function(err, client, done) {
            if (err) {
                return console.err(err);
            }
            client.query('select * from tin_phan_anhs', function(err, result) {
                done();
                if (err) {

                    return console.log(err);
                    res.end();
                }
                // console.log(result.rows[0].id)
                res.render("acopy.ejs", { danhsach: result })
            })
        })
    } else {
        res.redirect("/");
    }

})



app.get('/', (req, res) => res.render('index'));

app.get('/search', (req, res) => {
    const { id } = req.query;
    const { loai } = req.query;
    if (req.isAuthenticated()) {

        pool.connect(function(err, client, done) {
            if (err) {
                return console.err(err);
            }
            client.query("select * from tin_phan_anhs where id ='" + id + "'",
                function(err, result) {
                    done();
                    if (err) {

                        return console.log(err);
                        res.end();
                    }

                    res.render("acopy.ejs", { danhsach: result })
                })
        })
    } else {
        res.redirect("/acopy");
    }

})
app.get('/suli/:id', (req, res) => {
    if (req.isAuthenticated()) {

        pool.connect(function(err, client, done) {
            if (err) {
                return console.err(err);
            }
            const { id } = req.params;
            client.query("select * from tin_phan_anhs where id ='" + id + "'",
                function(err, result) {
                    done();
                    if (err) {

                        return console.log(err);
                        res.end();
                    }

                    res.render("suli.ejs", { sv: result.rows[0] })
                })
        })
    } else {
        res.redirect("/");
    }

})

app.post('/phanhoi', (req, res, next) => {
    if (req.isAuthenticated()) {

        pool.connect(function(err, client, done) {
            if (err) {
                return console.err(err);
            }
            const { id, phan_hoi } = req.body;
            client.query("update tin_phan_anhs set phan_hoi='" + phan_hoi + "' where id='" + id + "'",
                function(err, result) {
                    done();
                    if (err) {

                        return console.log(err);
                        res.end();
                    }
                    // console.log(result.rows[0])
                    res.render("suli.ejs", { sv: result.rows[0] })
                })
        })
    } else {
        res.redirect("/");
    }
})

app.post('/baocao', (req, res, next) => {
    if (req.isAuthenticated()) {

        pool.connect(function(err, client, done) {
            if (err) {
                return console.err(err);
            }
            const { id, tien_do, bao_cao } = req.body;
            client.query("update tin_phan_anhs set tien_do='" + tien_do + "',bao_cao='" + bao_cao + "' where id='" + id + "'",
                function(err, result) {
                    done();
                    if (err) {

                        return console.log(err);
                        res.end();
                    }
                    // console.log(result.rows[0])
                    res.render("suli.ejs", { sv: result.rows[0] })
                })
        })
    } else {
        res.redirect("/");
    }
})
app.get('/b', (req, res) => {
    if (req.isAuthenticated()) {

        pool.connect(function(err, client, done) {
            if (err) {
                return console.err(err);
            }
            client.query('select * from tin_phan_anhs', function(err, result) {
                done();
                if (err) {

                    return console.log(err);
                    res.end();
                }
                // console.log(result.rows[0].id)
                res.render("b.ejs", { danhsach: result })
            })
        })
    } else {
        res.redirect("/");
    }

})







const { Pool, Client } = require('pg')
const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'demoDB',
        password: 'linh2206',
        port: 5432,
    })
    // const client = new Client({
    //     user: 'postgres',
    //     host: 'localhost',
    //     database: 'demoDB',
    //     password: 'linh2206',
    //     port: 5432,
    // })
    // client.connect()
    // client.query('SELECT * from nguoi_dung', (err, res) => {
    //     console.log(err, res)
    //     client.end()
    // }) 
    // pool.query('SELECT NOW()', (err, res) => {
    //     console.log(err, res)
    // pool.end()
    // })
module.exports = app;