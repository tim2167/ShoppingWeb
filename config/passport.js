var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});

passport.use('local.signup',new LocalStrategy({  //Sign up authentications.
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req,email,password,done){  //check the input field , if they do not satisfy input requirements , load up on the error messages.
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);

        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err,user){  //look if the user exists, if the user exists already, return a message saying so.
    if(err){
    return done(err);
    }
    if(user){
        return done(null, false, {message: 'Email is already in use.'});
    }
    var newUser = new User();  //create a new user if 1) the input fields are satisfied and 2) no user exists with the same username.
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password); //encrypt the password
    newUser.save(function(err,result){
        if(err) {
            return done(err);
        }
        return done(null, newUser);
        });
    });
}));

passport.use('local.signin',new LocalStrategy({ //for signing in authentication.
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req,email,password,done){ //check the input field if it meets the input requirements, if there are erros, load up on the errors
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);

        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err,user){ //find if the user exists
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'User not found'});
        }
        if(!user.validPassword(password)){            //if the user exists, check the password that was input with the database
            return done(null, false, {message: 'Invalid password'});
        }
        return done(null,user);
    });
}));