function respon(res, status, result = ""){
    let description = ""
    switch (status) {
        case 200: 
            description = "OK"
            break
        case 401: 
            description = "Unauthorized"
            break
        case 403: 
            description = "Forbidden"
            break
        case 404:
            description = "Not Found"
            break
        case 500:
            description = "Internal Server Error"
            break
        default:
            description = ""
    }

    const isObject =  (data) => {
        return !!data && data.constructor === Object
    }

    const results =  {
        status: status,
        messege: description,
        result: isObject(result) ? [result] : Array.isArray(result) ? result : result,
    }

    res.status(status).json(results)
}

module.exports = respon