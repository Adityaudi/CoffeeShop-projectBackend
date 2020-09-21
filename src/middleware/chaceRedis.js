const redis = require("../Config/redisConn")


const GetAll = (req, res, next) => {
    redis.redisdb.get("cacheRedis", (err, respon) => {
        if (err) {
            return err
        }

        if (respon !== null) {
            const data = JSON.parse(respon)
            return res.status(200).json(data)
        } else {
            next()
        }
    })
}

module.exports = GetAll