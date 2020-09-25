const express = require('express')
const controller = require("../Controller/product")
const validate = require('../middleware/validate')
const redis = require('../middleware/chaceRedis')
const upload = require('../middleware/uploadfile')
const role = require("../middleware/access")
const username = require("../helper/auth")
const { end } = require('../Config/ConnectionDB')
const Route = express.Router()

Route.get("/", redis, controller.all)
Route.get ("/search", redis, controller.search)
Route.get ("/filterby", redis, controller.sort)

Route.post("/", validate, role)
Route.post("/add", controller.add)
Route.put("/", controller.update)
Route.delete("/delete/:ID", controller.delete)

module.exports = Route 