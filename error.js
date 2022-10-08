export const createError = (res , status , msg) => {
    return res.status(status).json({
        msg
    })
}