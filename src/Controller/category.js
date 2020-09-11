const model = require('../Model/CRUD-category')
const category = {}

category.all = async (request, response) => {
    try {
        const data = await model.GetAll()
        return response.status(200).json(data)  
    } catch (error) {
        return response.status(500).json(`OOPS! ERORR GET DATA. ${error}`)
    }
}
category.add = (req, res) => {
    const { CATEGORY, ID } = req.body
    const data = model.Add(CATEGORY, ID)
    return res.send(data)
}
category.update = (req, res) => {
    const { CATEGORY, ID } = req.body
    const data = model.Update(CATEGORY, ID)
    return res.send(data)
}
category.delete = (req, res) => {
    const {ID} = req.body
    const data = model.Delete(ID)
    return res.send(data)
}

module.exports = category