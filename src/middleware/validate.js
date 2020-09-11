const responseCode = require('../helper/response')
const jwt = require('jsonwebtoken')
require('jwt-decode')

const checkToken = (req, res, next) => {
    const {token} = req.headers

    if(!token) {
        const result = {
            msg : "please fill in the token!"
        }
        return responseCode(res, 404, result)
    }


    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
            const result = {
                err : err,
                msg : 'error'
            }
            return responseCode(res, 404, result)
        }
        next()
    })
}
module.exports = checkToken