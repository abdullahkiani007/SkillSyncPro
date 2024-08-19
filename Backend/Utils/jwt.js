const jwt = require('jsonwebtoken');
const RefreshToken = require('../Models/refreshToken.model');


module.exports = generateToken = (_id, role) => {
    const key = '34ad46e639bfc13ceba961f91d5d654c7598b791eebe36a1b1f2558713198349'
    const accessToken = jwt.sign({ id: _id, role: role }, 'your_jwt_secret', { expiresIn: '1h' });
    
    // Generate refresh token
    const refreshToken = jwt.sign({ id: _id }, 'your_refresh_token_secret', { expiresIn: '7d' });
    
    // Save refresh token in the database
    const refreshTokenDoc = new RefreshToken({
        userId: _id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7*24*60*60*1000) // 7 days from now
    });
    
    refreshTokenDoc.save();

    return { accessToken, refreshToken };
};
