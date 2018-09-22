
var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var Order = require('../models/order');
var Cart = require('../models/cart');
router.use(csrfProtection);

router.get('/profile',isLoggedIn ,function(req,res,next){ //show the user's profile page where they can see their orders that they made
    Order.find({user: req.user}, function(err, orders){
        if(err){
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', {orders: orders});
    });
});

router.get('/logout',isLoggedIn, function(req,res,next){ //logout.
    req.logout();
    res.redirect('/');
});

router.use('/',notLoggedIn,function(req, res, next){
    next();

});
router.get('/signup', function(req,res, next ){ //signup page
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken:req.csrfToken(), messages:messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', { //when the user signups authenticate with passport , if it works a new user is created.
    failureRedirect:'/user/signup',
    failureFlash:true
}), function(req,res, next){ //retains the previous site so users will be able to return
    if(req.session.oldUrl){
        var old = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(old);
    }
    else{
        res.redirect('/user/profile'); //if everything works and is signed in, go to the user's profile
    }
});


router.get('/signin', function(req,res, next ){ //user sign in page
    var messages = req.flash('error');
    res.render('user/signin',{csrfToken:req.csrfToken(), messages:messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', { //authenticate the user trying to sign in
    failureRedirect:'/user/signin',
    failureFlash:true
}), function(req,res, next){ //ex: when a user tries to checkout without logging in, they will be redirected here
    if(req.session.oldUrl){
        var old = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(old);
    }
    else{
        res.redirect('/user/profile');
    }
});





module.exports = router;

function isLoggedIn(req, res, next){ //helper function to prevent users from accessing pages they should be able to while not logged in
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next){ //helper function to ensure users are accessing pages they should only be able to access. (same as abov :) )
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}