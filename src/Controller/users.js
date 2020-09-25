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
users.search = async (req, res) => {
    const {token} = req.body
    const jwtToken = JwtDecode(token)
    const userRole = jwtToken.username
    const dataUser = await model.getByUser(userRole)
    const {username} = req.query.name=userRole
    const data = await model.search(username)
    return res.status(200).json(data)
}   

users.add = async (req, res) => {
    try {
            const hashPass = await hash(req.body.password)
            const data = {
                name : req.body.name,
                username : req.body.username,
                photo : req.body.photo,
                password : hashPass,
                role : req.body.role
            }
            const dataUser = model.add(data)
    } catch  {
        return res.status(500).json('error')
    }
} 


module.exports = users