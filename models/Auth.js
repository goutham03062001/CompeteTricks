const mongoose = require("mongoose");
const AuthSchema = mongoose.Schema({
    name : {type : String},
    email : {type : String},
    mobile : {type : String},
    password : {type : String},
    dob : {type : String},
    ip:{type : String}
});

module.exports = Auth = mongoose.model("AuthUsers",AuthSchema);