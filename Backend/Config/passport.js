const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const userModel = require('../Models/user.model')

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret',
}

let isStrategyInitialized = false

module.exports = () => {
  if (!isStrategyInitialized) {
    passport.use(
      new JWTStrategy(opts, async (jwt_payload, done) => {
        try {
          const user = await userModel.findById(jwt_payload.id)
          console.log('user in jwt_payload', user)
          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        } catch (err) {
          console.error(err)
          return done(err)
        }
      })
    )
    isStrategyInitialized = true
  }
}
