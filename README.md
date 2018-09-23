Welcome to ShoppingWeb , a ecommerce template website made by Tim2167!
A Heroku Version and a non local MongoDB server is planned in the next update!
It uses Stripe as the Payment Processor!
The following web app is created with node.js and express.js and mongoDB (local database)
The IDE I used to write this website was with is php-storm on Mac OS X Sierra.

express.js will install npm along with itself.

I did the following installations ( however I did it with npm —save so everything should still be there/ able to run)
Nom install express
npm bcrypt-nodes
npm connect-flash
npm connect-mongo
npm csrf         (this is csurf)
npm express-handlebars
npm express-session
npm express-validator
npm mongoose
npm passport
npm passport-local
npm save
Nom install stripe 
I used the mongoDB community version installed via HomeBrew. The files are in /bin/
To start mongoldb cd into /bin and run ./mongod in the terminal

Seed the products onto the website through : node product-seeder.js (the file I sent is already seeded I believe)

Start the server with npm start
Go to localhost:3000 

________________________________
User profile/ customer profile and added password encryption for each user
StripeAPI Payment at checkout!
_____________________________
Enjoy!
