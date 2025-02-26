const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500
    console.log(statusCode)

    const errStatus = err.status || 'error'
    const errMessage = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        status: errStatus,
        message: errMessage,
    })
}

export default errorHandler
