// userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../../Controllers/AuthController');
const passport = require('passport');

require('../../Config/passport')(passport);

// Define routes
router.post('/login', authController.login);



// signup
router.post('/signup', authController.signup);

router.get("/protected",passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send("You are authenticated");
}  );
// More routes...

module.exports = router;
