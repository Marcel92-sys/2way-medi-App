const jwt = require('express-jwt')


const generateToken = (user) => {
    return jwt.toString({
        _id: user._id,
        cadre:user.cadre,
        age:user.age
    }, process.env.JWT_SECRET, '1d')
};



module.exports = generateToken