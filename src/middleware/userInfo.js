const responseCode = require('../helper/response')
const DBdataUser= require('../Model/users')
const jwt = require('jsonwebtoken')
const JwtDecode = require('jwt-decode')

const checkusername = async (req, res, next) => {
    try {
        const {token} = req.body
        const jwtToken = JwtDecode(token)
        const userRole = jwtToken.username
        const dataUser = await DBdataUser.getByUser(userRole)
        console.log(dataUser[0].username)
    } catch (error) {
        return res.status(500).json(error)       
    }
}

module.exports = checkusername