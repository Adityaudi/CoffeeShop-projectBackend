const express = require('express')
const controller = require("../Controller/product")
const validate = require('../middleware/validate')
const redis = require('../middleware/chaceRedis')
const upload = require('../middleware/uploadfile')
const Route = express.Router()

Route.get("/",redis, validate, controller.all)
Route.get ("/search", controller.search)
Route.get ("/filterby", controller.sort)
Route.post("/", upload.single('IMG'), controller.add)
Route.put("/", controller.update)
Route.delete("/delete/:ID", controller.delete)

module.exports = Route 
