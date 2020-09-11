const express = require('express')
const controller = require("../Controller/product")
const validate = require('../middleware/validate')
const Route = express.Router()

Route.get("/",validate, controller.all)
Route.get ("/search", controller.search)
Route.get ("/filterby", controller.sort)
Route.post("/", controller.add)
Route.put("/", controller.update)
Route.delete("/delete/:ID", controller.delete)

module.exports = Route 
