const database = require('../Config/ConnectionDB')
const users = {}

users.GetAll = () => {
    return new Promise((resolve, reject) => {
        database 
            .query(`SELECT * FROM "TBL_USERLOGIN"`) 
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })          
}

users.add = (name, username, photo, password) => {
    database 
        .query(`INSERT INTO "TBL_USERLOGIN" (name, username, photo, password) VALUES ('${name}', '${username}', '${photo}', '${password}')`)
            .then((result) => {
                console.log('a')
                return result
            }).catch((err) => {
                console.log('b')
                return err
            });
}
users.getByUser = (user) => {
    return new Promise((resolve, reject) =>{
        database
            .query(`SELECT * FROM "TBL_USERLOGIN" WHERE username = '${user}' ` )
                .then((result) => {
                    resolve(result.rows)
                }).catch((err) => {
                    reject(err)
                });
    })
}
users.setToken = (token, name) => {
    return new Promise((resolve, reject) => {
        database
        .query(`UPDATE public."TBL_USERLOGIN" SET token = '${token}' WHERE username = '${name}'`)
        .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
    })
}

module.exports = users