const model = require('../Model/users')
const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
    const {token} = req.body

    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if(err){
            return res.status(401).json(err)
        }
        next()
    })
}


module.exports = checkToken