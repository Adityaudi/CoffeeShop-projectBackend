const model = require("../Model/CRUD-history")
const history = {} 

history.all = async (request, response) => {
    try {
        const data = await model.GetAll()
        return response.status(200).json(data)  
    } catch (error) {
        return response.status(500).json(`OOPS! ERORR GET DATA. ${error}`)
    }
}
history.add = (req, res) => {
    const { CASHIER, DATE, ORDERS, AMOUNT} = req.body
    const data = model.Add(CASHIER, DATE, ORDERS, AMOUNT)
    return res.send(data)
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