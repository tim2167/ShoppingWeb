
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({ //data type of a user
    email: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.methods.encryptPassword = function(password){ //helper function to encrypt the password for passport
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password){ //helper function to validate the password
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', userSchema);