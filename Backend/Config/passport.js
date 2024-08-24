const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const userModel = require('../Models/user.model');

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "your_jwt_secret"
};

let isStrategyInitialized = false;

module.exports = () => {
    if (!isStrategyInitialized) {
        console.log("Initializing Passport JWT Strategy");
        passport.use(
            new JWTStrategy(opts, async (jwt_payload, done) => {
                console.log("JWT Strategy invoked");
                console.log("jwt_payload:", jwt_payload);
            
                try {
                    console.log("Looking up user by ID:", jwt_payload.id);
                    const user = await userModel.findById(jwt_payload.id);
                    console.log("User lookup result:", user);
            
                    if (user) {
                        console.log("User found, authentication successful");
                        return done(null, user);
                    } else {
                        console.log("User not found, authentication failed");
                        return done(null, false);
                    }
                } catch (err) {
                    console.log("Error during user lookup");
                    console.error(err);
                    return done(err);
                }
            })
        );
        isStrategyInitialized = true;
    }
};