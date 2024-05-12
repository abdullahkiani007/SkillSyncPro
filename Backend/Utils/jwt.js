const jwt = require('jsonwebtoken')


module.exports =   generateToken = (_id,role) => {
    return jwt.sign({ id: _id , role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

