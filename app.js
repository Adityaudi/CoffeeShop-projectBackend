require('dotenv/config')
const express = require('express')
const Route = require("./src/main")
const database = require("./src/Config/ConnectionDB")
const bodyParser = require('body-parser')
const redis = require('./src/Config/redisConn')

const server = express()
const port = process.env.PORT

server.use(bodyParser.urlencoded({extended: false }))
server.use(bodyParser.json())
server.use(Route)

database.connect()
// eslint-disable-next-line no-unused-vars
.then (res => console.log (`Database Connected!`))
// eslint-disable-next-line no-unused-vars
.catch (err => console.log (`Database Not Connected`))

server.listen(port, () => {
    console.log (`Service app running on http://localhost:${port}`)
})

redis
    .redischeck()
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    });

// ..DOKUMENTASI POSTMAN
// https://documenter.getpostman.com/view/12508682/TVCdzo4B