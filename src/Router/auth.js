const express = require('express')
const controller = require ('../helper/auth')
const Route = express.Router()

Route.post("/", controller.login)

module.exports = Route