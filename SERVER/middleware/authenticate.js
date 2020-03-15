const jwt = require('jsonwebtoken')
const { User } = require('./../models/user.model')

const auth = async(req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '') //we take token correctly 

        //console.log(token);

        const decoded = jwt.verify(token, 'thisismyproject')
            //console.log(decoded);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })



        if (!user) {

            throw new Error()
        }

        req.token = token
        req.user = user
            // console.log("inside auth req.user :: ", req.user);


        next()

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = { auth }