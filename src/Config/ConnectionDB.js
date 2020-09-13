const Pool = require('pg-pool')

const conn = new Pool({
    database : process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST
})

module.exports = conn