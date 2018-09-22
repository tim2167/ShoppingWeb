var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({ //the data type to hold an order after the user has bought the items he/she want
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type:Object, required: true},
    address:{type: String, required:true},
    name: {type: String, required:true}
});

module.exports = mongoose.model('Order' , schema);