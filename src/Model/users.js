const database = require('../Config/ConnectionDB')
const users = {}

users.GetAll = () => {
    return new Promise((resolve, reject) => {
        database 
            .query(`SELECT * FROM "TBL_USER"`) 
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })          
}

users.add = (name, password) => {
    database 
        .query(`INSERT INTO "TBL_USER" (name, password) VALUES ('${name}', '${password}')`)
            .then((result) => {
                return result
            }).catch((err) => {
                return err
            });
}
users.getByUser = (user) => {
    return new Promise((resolve, reject) =>{
        database
            .query(`SELECT * FROM "TBL_USER" WHERE name = '${user}' ` )
                .then((result) => {
                    resolve(result.rows)
                }).catch((err) => {
                    reject(err)
                });
    })
}
users.setToken = (user, token) => {
    return new Promise((resolve, reject) => {
        database
            console.log('a')
            .query(`UPDATE "TBL_USER" SET tokenuser = '${token}' WHERE name = '${user}'`)
            .then((result) => {
                console.log('a')
                resolve(result)
            }).catch((err) => {
                console.log('b')
                reject(err)
            });
    })
}

module.exports = users