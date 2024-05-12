// userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../../Controllers/AuthController');
const passport = require('passport');

// Define routes
router.post('/login',passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.status(200).json({
        message: 'Hello from the server',
        route: 'GET /jobseeker'
    })
});

// signup
router.post('/signup', authController.signup);

router.get("/protected",)
// More routes...

module.exports = router;
