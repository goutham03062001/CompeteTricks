const mongoose = require("mongoose");
const AuthorizedUsers = mongoose.Schema({
    userId : {type : mongoose.Types.ObjectId,ref:"AuthUsers"},
    createdAt:{type : Date,default:Date.now().toLocaleString()},
    validUpto:{type : Date},
    PaymentId:{type:String},
    
});

module.exports = AuthroizedPersons = mongoose.model("AuthorizedUsers",AuthorizedUsers)