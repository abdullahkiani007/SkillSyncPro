const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const RefreshToken = require('../../Models/refreshToken.model');
const userModel = require('../../Models/user.model');


router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh Token is required' });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret');

        // Check if the refresh token exists in the database
        const savedToken = await RefreshToken.findOne({ token: refreshToken, userId: decoded.id });

        if (!savedToken || savedToken.expiresAt < new Date()) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        // Generate a new access token
        const user = await userModel.findById(decoded.id);
        const newAccessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Failed to authenticate refresh token' });
    }
});

module.exports = router;
