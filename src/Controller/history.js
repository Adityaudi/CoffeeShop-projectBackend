const model = require("../Model/CRUD-history")
const redis = require("../Config/redisConn")
const history = {} 

history.all = async (request, response) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("cache", 25,  data_redis)
        return response.status(200).json(data)  
    } catch (error) {
        return response.status(500).json(`OOPS! ERORR GET DATA. ${error}`)
    }
}
history.add = (req, res) => {
    const data = {
        CASHIER : req.body.CASHIER,
        DATE : req.body.DATE,
        ORDERS : req.body.ORDERS,
        AMOUNT :req.body.AMOUNT
    }
    console.log(req.body)
    const dataHistory = model.Add(data)
    return dataHistory
}

history.update = (req, res) => {
    const { INVOICES, CASHIER, DATE, ORDERS, AMOUNT} = req.body
    const data = model.Update(INVOICES, CASHIER, DATE, ORDERS, AMOUNT)
    return res.send(data)
}
history.delete = (req, res) => {
    const { INVOICES} = req.body
    const data = model.Delete(INVOICES)
    return res.send(data)
}

module.exports = history