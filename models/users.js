/*var mongoose=require('mongoose');
let userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    address:String,
    password:String
})

module.exports=mongoose.model('users',userSchema);*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    address:String,
    password:String
}),
User = mongoose.model('users', userSchema);

module.exports = User;