var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
/* GET home page. */
router.use(csrfProtection);

router.get('/', function(req, res, next) {
    var products = Product.find(function (err, docs) {
      var productSingle = [];
      var sizes = 3;
      for(var x = 0; x <docs.length; x += sizes ){
        productSingle.push(docs.slice(x, x+sizes));
      }
        res.render('shop/index', {title: 'Shopping Cart', products:productSingle});
    });
});

router.get('/user/signup', function(req,res, next ){
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken:req.csrfToken(), messages:messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
}));

router.get('/user/profile', function(req,res,next){
    res.render('user/profile');
});
module.exports = router;
