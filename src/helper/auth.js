/* eslint-disable no-undef */
const model = require('../Model/users');
const responseCode = require('../helper/response')
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken');
const auth = {}

auth.login = async (req, res) => {
        try {
            const dataUser = await model.getByUser(req.body.username)
            
            if (dataUser.length == []){
                return responseCode(res, 404, 'Username Not Found!')
            } else {
                const passUser = req.body.password
                const checkPass = await bcr.compare(passUser,dataUser[0].password)

                if (checkPass){
                    const username = dataUser[0].username
                    const tokenUser = await auth.TokenUser(req.body.username)
                    const token = tokenUser.tokenRefresh
                    const RefreshToken = await model.setToken(token, username)
                    return responseCode(res, 200, tokenUser)
                }else {
                    return responseCode(res, 200, 'Invalid Username & Password!')
                }
            }
        } catch (error) {
            return responseCode(res, 500, error)
        }
    }
auth.TokenUser = async (user, role) => {
    try {
        const payload = {
            username : user,
            role : role
        }
        const tokenLimit = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 200} )
        const tokenRefresh = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 7000} )
        const result = {
            tokenLimit : tokenLimit, 
            tokenRefresh : tokenRefresh,
            msg : "Token succesfully created!"
        }
      
        return result
    } catch (error) {
        return error
    }
}

module.exports = auth