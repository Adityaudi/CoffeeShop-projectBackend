/* eslint-disable no-unused-vars */
const database = require('../Config/ConnectionDB')
const product = {}

product.GetAll = () => {
    return new Promise((resolve, reject) => {
        database 
            .query(`SELECT * FROM "TBL_PRODUK"`) 
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })          
}
//search product
product.search = (NAME_PRODUCT) => {
    return new Promise((resolve, reject) => {
        database 
            .query(`SELECT * FROM "TBL_PRODUK" WHERE "NAME_PRODUCT" LIKE '%${NAME_PRODUCT}%' ORDER BY "ID" ASC`)
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
//sort based on TBL_PRODUK
product.sort = (SORT) => {
    return new Promise((resolve, reject) => {
        database
            .query(
                `SELECT * FROM "TBL_PRODUK" ORDER BY "${SORT}" ASC`)
            .then((res)=> {
                resolve(res.rows)
            })
            .catch((err)=>{
                reject(err)
            })
    })
} 

// Add Product.
product.Add = (data) => {
        database 
            .query (`INSERT INTO "TBL_PRODUK" ("NAME_PRODUCT", "PRICE", "IMG", "CATEGORY") VALUES ('${data.NAME_PRODUCT}', ${data.PRICE}, '${data.IMG}', '${data.CATEGORY}')`)
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
}
// Update Product
product.Update = (data) => {
    database
        .query(
            `UPDATE "TBL_PRODUK" SET "NAME_PRODUCT" = '${data.NAME_PRODUCT}', "PRICE" = ${data.PRICE}, "IMG" = '${data.IMG}', "CATEGORY" = '${data.CATEGORY}' WHERE "ID" = '${data.ID}'`)
        .then((res) => {
            res = "Update product success!"
            return res
        })
        .catch((err) => {
            return err
        })
}
// Delete data Produk
product.Delete = (ID) => {
    database
        .query (
            `DELETE FROM "TBL_PRODUK" WHERE "ID" = ${ID}`)
        .then((res) => {
            res = "Delete Produk success!"
            return res
        })
        .catch((err) => {
            return err
        })
}  

module.exports = product