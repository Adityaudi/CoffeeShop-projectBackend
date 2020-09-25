/* eslint-disable no-undef */
const model = require('../Model/users');
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken');
const JwtDecode = require('jwt-decode')
const auth = {}

auth.login = async (req, res) => {
        try {
            const dataUser = await model.getByUser(req.body.username)
            if (dataUser.length == []){ 
                return res.status(404).json('Username Not Found!')
            } 
                const passUser = req.body.password
                const checkPass = await bcr.compare(passUser,dataUser[0].password)
                if (checkPass){
                    const user = dataUser[0].username
                    const tokenUser = await auth.TokenUser(req.body.username)
                    const token = tokenUser.token
                    const updateToken = await model.setToken(token, user)
                    return res.status(200).json(token)
                }else {
                    return res.status(401).json('Invalid Username & Password!')
                }
        
        } catch (error) {
            return  error
        }
    }
auth.TokenUser = async (user) => {
    try {
        const payload = {
            username : user
        }
        const tokenLimit = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 1000} )
        const result = {
            token : tokenLimit, 
            msg : "Token succesfully created!"
        }
        return result
    } catch (error) {
        return error
    }
}
auth.search = async (req, res) => {
    const {token} = req.body
    const jwtToken = JwtDecode(token)
    const username = jwtToken.username
    const data = await model.search(username)
   
    return res.status(200).json(data)
}

module.exports = auth