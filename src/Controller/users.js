const model = require('../Model/users')
const responseCode = require('../helper/response')
const hash = require('../helper/hash')
const users = {}

users.all = async (request, response) => {
    try {
        const data = await model.GetAll()
        return responseCode(response, 200 ,data)  
    } catch  {
        return responseCode(response, 500)
    }
}    
users.add = async (req, res) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const {name, username,photo, password} = req.body
        const hashPassword = await hash(req.body.password)
        const image = req.file.path
        console.log(image)
        // eslint-disable-next-line no-unused-vars
        
        const data = model.add(name,username,image, hashPassword)
        return responseCode(res, 200, 'User been register!') 
    } catch  {
        return responseCode(res, 500, 'User regist Error!')    
    }
} 


module.exports = users