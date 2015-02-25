var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    request = require('request');

function Local(options) {
    this.options = options;
    this.key = 'local';
}

Local.key = 'local';

Local.prototype.setup = function() {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(identifier, password, done) {
        request('http://127.0.0.1:3000/api/v1/login', function (error, response, body) {
            // if (!error && response.statusCode == 200) {
                console.log(body); // Show the HTML for the Google homepage. 
            // }
        })


        var User = mongoose.model('User');
        User.authenticate(identifier, password, function(err, user) {
            if (err) {
                return done(null, false,  {
                    message: 'Some fields did not validate.'
                });
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, null, {
                    message: 'Incorrect login credentials.'
                });
            }
        });
    }));
};

Local.prototype.authenticate = function(req, cb) {
    passport.authenticate('local', cb)(req);
};

module.exports = Local;
