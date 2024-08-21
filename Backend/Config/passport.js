const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


const userModel = require('../Models/user.model');

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:  "your_jwt_secret"
};

module.exports = (passport) => {
    passport.use(
        new JWTStrategy(opts, async (jwt_payload, done) => {
            console.log("jwt_payload",jwt_payload);
            try {

                const user = await userModel.findById(jwt_payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                console.log(err);
                done(err)
            }
    }));
}