var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            User.findOne({'local.email': email}, function (err, user) {
                if (err) return done(err);

                if (user) {
                    return done(null, false);
                } else {

                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.first_name = req.body.first_name;
                    newUser.last_name = req.body.last_name;
                    newUser.gender = req.body.gender;
                    newUser.country.country_name = req.body.country_name;
                    newUser.country.country_code = req.body.country_code;
                    newUser.role = req.body.role;

                    newUser.save(function (err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }

            });

        })
    );

    passport.use('local-admin-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            User.findOne({'local.email': email}, function (err, user) {
                if (err) return done(err);

                if (!user) {
                    return done(null, false);
                }

                if (user.role !== 'Administrator'){
                    return done(null, false);
                }

                if (!user.validPassword(password)) {
                    return done(null, false);
                }

                return done(null, user);
            });

        })
    );
};
