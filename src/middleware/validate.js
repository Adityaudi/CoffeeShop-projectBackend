const responseCode = require('../helper/response')
const model = require('../Model/users')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const checkToken = async (req, res, next) => {
    const {token} = req.headers

    if(!token) {
        const result = {
            msg : "please fill the token!"
        }
        return responseCode(res, 401, result)
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err) => {
        if(err.name == "JsonWebTokenError"){
            return responseCode(res, 401, 'Invalid Token!')
        }
    })
    decodeUser = jwtDecode(token)

    jwt.verify(token, process.env.SECRET_KEY, async (err) => {
        const payload = {
            erorr : err
        }
            if (err.message == 'jwt expired') {
                const newToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 1000})
                const UpdateToken = await model.setToken(newToken, decodeUser.username)
            }               
        next()
            
    })
}


module.exports = checkToken