const responseCode = require('../helper/response')
const DBdataUser= require('../Model/users')
const jwt = require('jsonwebtoken')
const JwtDecode = require('jwt-decode')

const checkrole = async (req, res, next) => {
    try {
        const {token} = req.headers

        const jwtToken = JwtDecode(token)
        const userRole = jwtToken.username
        const dataUser = await DBdataUser.getByUser(userRole)
        
        if (dataUser[0].role == 'admin'){
            next()
        }else {
           responseCode(res, 401 ,'ACCESS BLOCKED, Please call admin!')
        }

    } catch (error) {
        return responseCode(res, 500, 'Access Error!')       
    }
}

module.exports = checkrole