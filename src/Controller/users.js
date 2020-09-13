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
        if (req.file === undefined) {
            return res.status(500).json("YOUR PHOTO NOT FILLED!")
        } else {
            const hashPass = await hash(req.body.password)
            const data = {
                name : req.body.name,
                username : req.body.username,
                photo : req.file.path,
                password : hashPass,
                role : req.body.role
            }
            const dataUser = model.add(data)
            return responseCode(res, 201, 'Users been registed!')
        }

    } catch  {
        return responseCode(res, 500, 'User regist Error!')    
    }
} 


module.exports = users