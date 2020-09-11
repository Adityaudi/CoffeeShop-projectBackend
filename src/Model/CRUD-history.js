const database = require('../Config/ConnectionDB')
const history = {}

history.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query(`SELECT * FROM "TBL_HISTORY"`)
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Add history
history.Add = (CASHIER, DATE, ORDERS, AMOUNT) => {
    database 
        .query (
            `INSERT INTO "TBL_HISTORY" ("CASHIER", "DATE", "ORDERS", "AMOUNT") VALUES ('${CASHIER}', '${DATE}', '${ORDERS}', ${AMOUNT})`)
        .then((res) => {
            res = "add history success!"
            return res
        })
        .catch((err) => {
            return err
        })
    }
// Update history
history.Update = (INVOICES, CASHIER, DATE, ORDERS, AMOUNT) => {
    database
        .query (
            `UPDATE "TBL_HISTORY" SET "CASHIER" = '${CASHIER}', "DATE"='${DATE}', "ORDERS"='${ORDERS}', "AMOUNT"='${AMOUNT}' WHERE "INVOICES"= ${INVOICES}`)
        .then((res) => {
            res = "Update history success!"
            return res
        })
        .catch((err) => {
            return err
        })
}   
// Delete data history
history.Delete = (INVOICES) => {
    database
        .query (
            `DELETE FROM "TBL_HISTORY" WHERE "INVOICES"= ${INVOICES}`)
        .then((res) => {
            res = "Delete history success!"
            return res
        })
        .catch((err) => {
            return err
        })
}  

    
module.exports = history