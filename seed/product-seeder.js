var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping');
var products = [ //to populate the shopping website's products.
    new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/911uAMIhbqL._SL1500_.jpg',
    title: 'Star Wars IV : A New Hope DVD',
    description: 'The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.',
    price:20,
        identifier:1
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51PPHWJ4TRL.jpg',
        title: 'Star Wars V : The Empire Strikes Back DVD',
        description: 'Fleeing the evil Galactic Empire, the Rebels abandon their new base in an assault with the Imperial AT-AT walkers on the ice world of Hoth. Princess Leia, Han Solo, Chewbacca and the droid C-3PO escape in the Millennium Falcon, but are later captured by Darth Vader on Bespin. Meanwhile, Luke Skywalker and the droid R2-D2 follows Obi-Wan Kenobi\'s posthumous command, and receives Jedi training from Master Yoda on the swamp world of Dagobah. Will Skywalker manage to rescue his friends from the Dark Lord?',
        price:20,
        identifier:2
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/91LlN7J%2BZ9L._SY445_.jpg',
        title: 'Star Wars VI : Return of the Jedi DVD',
        description: 'Darth Vader and the Empire are building a new, indestructible Death Star. Meanwhile, Han Solo has been imprisoned, and Luke Skywalker has sent R2-D2 and C-3PO to try and free him. Princess Leia - disguised as a bounty hunter - and Chewbacca go along as well. The final battle takes place on the Forest Moon of Endor, with its natural inhabitants, the Ewoks, lending a hand to the Rebels. Will Darth Vader and the Dark Side overcome the Rebels and take over the universe?',
        price:20,
        identifier:3
    }),
    new Product({
        imagePath: 'https://img00.deviantart.net/8923/i/2015/314/7/8/star_wars_4_blu_ray_cover_by_mattoliver21-d9g74z5.png',
        title: 'Star Wars IV : A New Hope BluRay',
        description: 'The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.',
        price:25,
        identifier:4
    }),
    new Product({
        imagePath: 'https://pre00.deviantart.net/d717/th/pre/i/2015/314/d/7/star_wars_5_blu_ray_cover_by_mattoliver21-d9g74yo.png',
        title: 'Star Wars V : The Empire Strikes Back BluRay',
        description: 'Fleeing the evil Galactic Empire, the Rebels abandon their new base in an assault with the Imperial AT-AT walkers on the ice world of Hoth. Princess Leia, Han Solo, Chewbacca and the droid C-3PO escape in the Millennium Falcon, but are later captured by Darth Vader on Bespin. Meanwhile, Luke Skywalker and the droid R2-D2 follows Obi-Wan Kenobi\'s posthumous command, and receives Jedi training from Master Yoda on the swamp world of Dagobah. Will Skywalker manage to rescue his friends from the Dark Lord?',
        price:25,
        identifier:5
    }),
    new Product({
        imagePath: 'https://pre00.deviantart.net/b8c9/th/pre/i/2015/314/2/9/star_wars_6_blu_ray_cover_by_mattoliver21-d9g74y9.png',
        title: 'Star Wars VI : Return of the Jedi BluRay',
        description: 'Darth Vader and the Empire are building a new, indestructible Death Star. Meanwhile, Han Solo has been imprisoned, and Luke Skywalker has sent R2-D2 and C-3PO to try and free him. Princess Leia - disguised as a bounty hunter - and Chewbacca go along as well. The final battle takes place on the Forest Moon of Endor, with its natural inhabitants, the Ewoks, lending a hand to the Rebels. Will Darth Vader and the Dark Side overcome the Rebels and take over the universe?',
        price:25,
        identifier:6
    })
];
var done = 0;
for(var x= 0; x <products.length;x++){
    products[x].save(function(err,result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}


function exit(){
    mongoose.disconnect();
}
