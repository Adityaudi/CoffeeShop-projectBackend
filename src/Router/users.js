const express = require('express')
const controller = require("../Controller/users")
const Route = express.Router()

Route.get("/", controller.all)
Route.post("/", controller.add)

module.exports = Route