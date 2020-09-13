function respon(res, status, result = ""){
    let messege = ""
    
    switch (status) {
        case 200: 
            messege = "OK"
            break
        case 201:
            messege = "Created!"
            break
        case 401: 
            messege = "Unauthorized"
            break
        case 403: 
            messege = "Forbidden"
            break
        case 404:
            messege = "Not Found"
            break
        case 500:
            messege = "Internal Server Error"
            break
        default:
            messege = ""
    }

    const isObject =  (data) => {
        return !!data && data.constructor === Object
    }

    const results =  {
        status: status,
        description : messege,
        result: isObject(result) ? [result] : Array.isArray(result) ? result : result,
    }
    res.status(status).json(results)
}

module.exports = respon