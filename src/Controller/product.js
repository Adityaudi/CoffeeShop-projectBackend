const model = require("../Model/CRUD-product")
const redis = require('../Config/redisConn')
const product = {} 

product.all = async (request, response) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("cacheRedis", 25,  data_redis)
        return response.status(200).json(data)  
    } catch  {  
        return response.status(404).json('Data not found')
    }
}               
product.search= async (request, response) => {
    try {
        const NAME_PRODUCT = request.query.name
        const data = await model.search(NAME_PRODUCT)
        if (data.length < 1){
            return response.status(404).json('Product Not Found!')
        } else {
            return response.status(200).json(data)
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
        // if (req.file === undefined) {
        //     return res.status(500).json("IMAGE PRODUCT NOT FILLED!")
        // }else {
            const data = {
                NAME_PRODUCT : req.body.NAME_PRODUCT,
                PRICE : req.body.PRICE,
                IMG : req.body.IMG,
                CATEGORY : req.body.CATEGORY
            }
            const dataAdd = model.Add(data)
        return res.status(200).json('BERHASIL')
    } catch (error) {
        return responseCode(res, 500, 'ERROR, ADD PRODUCT!')
    }   
}

product.update = (req, res) => {
    try {
        console.log('a')
        const data = {
            ID : req.body.ID,
            NAME_PRODUCT : req.body.NAME_PRODUCT,
            PRICE : req.body.PRICE,
            IMG : req.body.IMG,
            CATEGORY : req.body.CATEGORY
        }
        const dataUpdate = model.Update(data)
        return res.status(200).json('UPDATE PRODUCT SUCCESS!') 
    } catch (error) {
        res.send('ERROR UPDATE PRODUCT')
        return responseCode(res, 500, 'ERROR, DATABASE CONNECTION!')
    }
}
product.delete = async  (req, res) => {
    try {
        const { ID } = req.params
        const data = await model.Delete(ID)
        return res.status(200).json('product deleted.')
    } catch (error) {
        res.send('ERROR DELETE PRODUCT')
        return responseCode(res, 500, 'ERROR, DATABASE CONNECTION!')
    }
}

module.exports = product