const Pool = require('pg-pool')

const conn = new Pool({
    database : 'cofeeshop',
    user: 'adityaudi',
    password: '22',
    host:'localhost'
})

module.exports = conn