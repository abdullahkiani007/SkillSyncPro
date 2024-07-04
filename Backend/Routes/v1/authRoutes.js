// userRoutes.js
const express = require('express');
const AuthRouter = express.Router();
const authController = require('../../Controllers/AuthController');
const passport = require('passport');

require('../../Config/passport')(passport);

// Define routes
AuthRouter.post('/login', authController.login);



// signup
AuthRouter.post('/signup', authController.signup);

AuthRouter.get("/protected",passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send("You are authenticated");
}  );
// More routes...

module.exports = AuthRouter;
