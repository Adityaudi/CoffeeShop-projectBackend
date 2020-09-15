const model = require("../Model/CRUD-product")
const responseCode = require("../helper/response")
const redis = require('../Config/redisConn')
const product = {} 

product.all = async (request, response) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("cacheAdd", 25,  data_redis)
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
            const data_redis = JSON.stringify(data)
            redis.redisdb.setex("cache", 5,  data_redis)
            const dataAdd = model.Add(data)
            return responseCode(res, 201, 'PRODUCT ADDED on coffeeshop!')
        }
    } catch (error) {
        return responseCode(res, 500, 'ERROR, ADD PRODUCT!')
    }   
}

product.update = (req, res) => {
    try {
        if (req.file === undefined) {
            return res.status(500).json("IMAGE PRODUCT NOT FILLED!")
        }else{
            const data = {
                ID : req.body.ID,
                NAME_PRODUCT : req.body.NAME_PRODUCT,
                PRICE : req.body.PRICE,
                IMG : req.file.path,
                CATEGORY : req.body.CATEGORY
            }
            const data_redis = JSON.stringify(data)
            redis.redisdb.setex("cache", 5,  data_redis)
            const dataUpdate = model.Update(data)
            return responseCode(res, 200, 'UPDATE PRODUCT SUCCESS!')
        }
    } catch (error) {
        res.send('ERROR UPDATE PRODUCT')
        return responseCode(res, 500, 'ERROR, DATABASE CONNECTION!')
    }
}
product.delete = async (req, res) => {
    try {
        const { ID } = req.body
        const data = await model.Delete(ID)
        return responseCode(res, 200, 'product deleted.')
    } catch (error) {
        res.send('ERROR DELETE PRODUCT')
        return responseCode(res, 500, 'ERROR, DATABASE CONNECTION!')
    }
}

module.exports = product