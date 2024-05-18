// userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../../Controllers/AuthController');
const passport = require('passport');
const userController = require('../../Controllers/UserController');

require('../../Config/passport')(passport);

router.get("/protected",passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send("You are authenticated");
}  );

router.get("/profile",
passport.authenticate('jwt', { session: false }),userController.getInfo)

router.put("/profile",
passport.authenticate('jwt', { session: false }),userController.updateInfo)


module.exports = router;
