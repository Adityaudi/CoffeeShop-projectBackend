/* eslint-disable no-undef */
const model = require('../Model/users');
const responseCode = require('../helper/response')
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken');
const auth = {}

auth.login = async (req, res) => {
        try {
            const dataUser = await model.getByUser(req.body.username)
            username = dataUser[0].username
            if (dataUser.length <= 0){
                return responseCode(res, 404, 'Username Not Found!')
            }
                const passUser = req.body.password
                const checkPass = await bcr.compare(passUser,dataUser[0].password)

                if (checkPass){
                    const tokenUser = await auth.setToken(req.body.username)
                    token = tokenUser.tokenRefresh
                    const RefreshToken = await model.setToken(token, username)
                    const tokenLimit= responseCode(res, 200, tokenUser.tokenLimit)
                    return tokenLimit, RefreshToken
                }else {
                    return responseCode(res, 200, 'Invalid Username & Password!')
                }

        } catch (error) {
            return responseCode(res, 500, error)
        }
    }
auth.setToken = async (user) => {
    try {
        const payload = {
            user : user
        }
        const tokenLimit = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '60s'} )
        const tokenRefresh = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '7d'} )
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