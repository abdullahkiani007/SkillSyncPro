const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const userModel = require('../Models/user.model');

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "my_secret_key",
};

module.exports = (passport) => {
    passport.use(
        new JWTStrategy(opts, async (jwt_payload, done) => {
            console.log(opts.jwtFromRequest)
            try {
                const user = await userModel.findById(jwt_payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                console.log(err);
            }
    }));
}