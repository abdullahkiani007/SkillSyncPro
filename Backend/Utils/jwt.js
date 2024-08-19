const jwt = require('jsonwebtoken')


module.exports =   generateToken = (_id,role) => {
    console.log("hii")
    JWT_SECRET = "34ad46e639bfc13ceba961f91d5d654c7598b791eebe36a1b1f2558713198349"
    console.log(process.env.JWT_SECRET);
    return jwt.sign({ id: _id , role: role }, JWT_SECRET, { expiresIn: '1h' });
}

