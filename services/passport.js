require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  //user is what we pulled out of the database
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
})
passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((user) => {
          if (!user) {
            new User({
              googleId: profile.id,
            })
              .save()
              .then((user) => done(null, user));
            done();
          } else {
            done(null, user);
          }
        });

        console.log('access ', accessToken);
        console.log('refresh ', refreshToken);
        console.log('profile ', profile);
        console.log('done ', done)
    })
); 

