const database = require('../Config/ConnectionDB')
const category = {}

category.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query(`SELECT * FROM "TBL_CATEGORY"`)
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
//Add Category
category.Add = (CATEGORY, ID) => {
    database 
        .query (`INSERT INTO "TBL_CATEGORY" ("CATEGORY", "ID") VALUES ('${CATEGORY}', '${ID}')`)
        .then((res) => {
            res = "add category success!"
            return res
        })
        .catch((err) => {
            return err
        })
}
// Update category
category.Update = (CATEGORY, ID) => {
    database
        .query(`UPDATE "TBL_CATEGORY" SET "CATEGORY"= '${CATEGORY}' WHERE "ID"= '${ID}'`)
        .then((res) => {
            res = "Update product success!"
            return res
        })
        .catch((err) => {
            return err
        })
}
// Delete data history
category.Delete = (ID) => {
    database
        .query (
            `DELETE FROM "TBL_CATEGORY" WHERE "ID"= '${ID}'`)
        .then((res) => {
            res = "Delete Category success!"
            return res
        })
        .catch((err) => {
            return err
        })
}  
module.exports = category