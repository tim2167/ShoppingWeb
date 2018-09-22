var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({ //datatype to populate the shopping site with the items on sale (star wars dvd)
    imagePath:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true},
    price :{type: Number, required: true},
    identifier:{type:Number,required:true}

});

module.exports = mongoose.model('Product' , schema);