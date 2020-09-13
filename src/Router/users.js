const express = require('express')
const controller = require("../Controller/users")
const upload = require('../middleware/uploadfile')
const redis = require('../middleware/chaceRedis')
const Route = express.Router()

Route.get("/",redis, controller.all)
Route.post("/",upload.single("photo"), controller.add)

module.exports = Route