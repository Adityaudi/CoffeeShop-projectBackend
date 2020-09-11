const model = require('../Model/users')
const responseCode = require('../helper/response')
const hash = require('../helper/hash')
const users = {}

users.all = async (request, response) => {
    try {
        const data = await model.GetAll()
        console.log(data)
        return responseCode(response, 200 ,data)  
    } catch  {
        return responseCode(response, 500)
    }
}    
users.add = async (req, res) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const {name, password} = req.body
        const hashPass = await hash(req.body.password)
        // eslint-disable-next-line no-unused-vars
        const data = model.add(name, hashPass)
        return responseCode(res, 200, await model.GetAll()) 
    } catch  {
        return responseCode(res, 500, 'Data User Error!')    
    }
} 


module.exports = users