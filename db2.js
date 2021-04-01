const pg = require('pg')
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'demoDB',
    password: 'linh2206',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000,
}

const pool = new pg.Pool(dbConfig)

pool.on('error', function(err) {
    winston.error('idle client error', err.message, err.stack)
})
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}