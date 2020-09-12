const express = require('express')
const helper = require ('../helper/auth')
const Route = express.Router()

Route.post("/", helper.login)
// Route.put("/", helper.update)

module.exports = Route