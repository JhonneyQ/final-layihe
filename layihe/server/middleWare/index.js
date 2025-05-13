const authMiddleware = async(req, res, next) => {

    const jwtkey = process.env.JWT_SECRET_KEY

    try {
        const token = req.headers.authorization

        const decoded = jwt.verify(token, jwtkey)
        if (decoded !== "admin"){
            return res.status(403).json({message:"you are not admin"})
        }
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


module.exports = authMiddleware