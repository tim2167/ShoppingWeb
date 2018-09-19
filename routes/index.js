var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
/* GET home page. */
var Order = require('../models/order');

router.get('/', function(req, res, next) {

    Product.find(function (err, docs) {
        var successMsg = req.flash('success')[0];
        var productSingle = [];
        var sizes = 3;
        for(var x = 0; x <docs.length; x += sizes ){
            productSingle.push(docs.slice(x, x+sizes));
        }
        res.render('shop/index', {title: 'Shopping Cart', products:productSingle, successMsg: successMsg , noMessages:!successMsg});
    });
});
router.get('/addCart/:id/:identifier', function(req, res,next){
    var productId = req.params.id;
    console.log(req.param("amount"));
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product){
        if(err) {
            return res.redirect('/');
        }
        cart.add(product,product.identifier,req.param("amount"));
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/changeAmount/:identifier', function(req,res,next){
    var productId = req.params.identifier;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.changeAmount(productId, req.param("amount"));
    req.session.cart = cart;
    res.redirect('/shoppingCart');
});
router.get('/removeItem/:identifier', function(req,res,next){
    var productId = req.params.identifier;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shoppingCart');
});
router.get('/shoppingCart', function(req,res,next){
    if(!req.session.cart){
        return res.render('shop/shoppingCart',{products:null});

    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shoppingCart', {products:cart.generateArray(),totalPrice: cart.totalPrice, dvdDiscount: cart.dvdDiscount, blueRayDiscount: cart.blueRayDiscount , totalDiscount: cart.totalDiscountedPrice, finalPrice:cart.actualPrice});
});


router.get('/checkout',isLoggedIn, function(req,res,next){
    if(!req.session.cart){
        return res.redirect('/shoppingCart');
    }
    var errMsg = req.flash('error')[0] //Set errMsg to nothing since I am not adding a stripe payment module.
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {total:cart.actualPrice, errMsg: errMsg , noError: !errMsg});
});
router.post('/checkout', isLoggedIn, function(req,res,next){
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name
    });
    order.save(function(err,result){
    req.flash('success','Successfully bought!');
    req.session.cart = null;
    res.redirect('/')});
});
module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
};