const express = require('express')
const helper = require ('../helper/auth')
const auth = require('../helper/auth')
const Route = express.Router()

Route.post("/", helper.login)

module.exports = Route