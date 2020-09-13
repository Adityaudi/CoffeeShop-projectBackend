const model = require("../Model/CRUD-product")
const responseCode = require("../helper/response")
const redis = require('../Config/redisConn')
const product = {} 

product.all = async (request, response) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("cache", 25,  data_redis)
        return responseCode(response, 200 ,data)  
    } catch  {  
        return responseCode(response, 500)
    }
}               
product.search= async (request, response) => {
    try {
        const NAME_PRODUCT = request.query.name
        const data = await model.search(NAME_PRODUCT)
        if (data.length < 1){
            return responseCode(response, 404, 'Product Not Found!' )
        } else {
            return responseCode(response, 200 ,data)
        }   
    } catch {
        return responseCode(response, 200, 'Product Not Found!')
    }
}
product.sort = async (request, response) => {
    const sort = request.query.sort
    const data = await model.sort(sort)
    return response.send(data)
}

product.add = (req, res) => {
    try {
        if (req.file === undefined) {
            return res.status(500).json("IMAGE PRODUCT NOT FILLED!")
        }else {
            const data = {
                NAME_PRODUCT : req.body.NAME_PRODUCT,
                PRICE : req.body.PRICE,
                IMG : req.file.path,
                CATEGORY : req.body.CATEGORY
            }
            const dataProduct = model.Add(data)
            responseCode(res, 201, 'PRODUCT ADDED!')
        }
    } catch (error) {
        return responseCode(res, 500, 'ERROR, ADD PRODUCT!')
    }   
}

product.update = (req, res) => {
    try {
        const {ID, NAME_PRODUCT, PRICE, IMG, CATEGORY} = req.body
        const data = model.Update(ID, NAME_PRODUCT, PRICE, IMG, CATEGORY)
        return responseCode(res, 200, data)
    } catch (error) {
        res.send('ERROR UPDATE PRODUCT')
        return responseCode(res, 500, 'ERROR, DATABASE CONNECTION!')
    }
}
product.delete = async (req, res) => {
    try {
        const { ID } = req.params
        const data = await model.Delete(ID)
        if (data.rowCount > 0) {
            return res.send({ success: true, message: "Delete successfuly!" })
        } else {
            return res.status(500).send({ success: false, message: `Data with id ${ID} is not found` })
        }
    } catch (error) {
        res.send('ERROR DELETE PRODUCT')
        return responseCode(res, 500, 'ERROR, DATABASE CONNECTION!')
    }
}

module.exports = product