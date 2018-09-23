var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
/* GET home page. */
var Order = require('../models/order');

router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0];
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
router.get('/addCart/:id/:identifier', function(req, res,next){ //script to add a product into shopping car when apurchase is made on the main webpage.
    var productId = req.params.id;
    console.log(req.param("amount"));
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product){ //find if such a product exists and if it does call the add function to add into cart then redirect to the main shopping page.
        if(err) {
            return res.redirect('/');
        }
        cart.add(product,product.identifier,req.param("amount"));
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/changeAmount/:identifier', function(req,res,next){ //script when change amount is called in the shopping cart page.
    var productId = req.params.identifier;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.changeAmount(productId, req.param("amount"));
    req.session.cart = cart;
    res.redirect('/shoppingCart');
});
router.get('/removeItem/:identifier', function(req,res,next){ //script when remove item is called in the shopping cart page
    var productId = req.params.identifier;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shoppingCart');
});
router.get('/shoppingCart', function(req,res,next){ //show the shopping cart page.
    if(!req.session.cart){
        return res.render('shop/shoppingCart',{products:null});

    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shoppingCart', {products:cart.generateArray(), totalPrice: cart.totalPrice, dvdDiscount: cart.dvdDiscount, blueRayDiscount: cart.blueRayDiscount , totalDiscount: cart.totalDiscountedPrice, finalPrice:cart.actualPrice});
});


router.get('/checkout',isLoggedIn, function(req,res,next){ //get the checkout page
    if(!req.session.cart){
        return res.redirect('/shoppingCart');
    }
    var errMsg = req.flash('error')[0];
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {total:cart.actualPrice, errMsg: errMsg, chargePrice: cart.actualPrice*100 , noError: !errMsg});
});
router.post('/checkout', isLoggedIn, function(req,res,next) { //create a order when the user checks out
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var stripe = require("stripe")("sk_test_M8JHp9NL0nBuaAORpqLxpaQp");
    var chargePrice = req.body.chargePrice;
    const token = req.body.stripeToken; // Using Express
    var cart = new Cart(req.session.cart);
    var charge = stripe.charges.create({
        amount: chargePrice,
        currency: "usd",
        source: token, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err && err.type ==="StripeCardError") {
            console.log("Your Card was declined");
        }
        else {
            var order = new Order({
                user: req.user,
                cart: cart,
                address: req.body.address,
                name: req.body.name,
            });
            order.save(function (err, result) {
                req.flash('success', 'Successfully bought product!');
                req.session.cart = null;
                res.redirect('/');
            });
        }
    });
});
module.exports = router;

function isLoggedIn(req, res, next){ //helper function to make sure site/pages that prevents no logged in users from going sites they shouldnt access
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
};