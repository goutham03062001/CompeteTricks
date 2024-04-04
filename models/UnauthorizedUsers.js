const mongoose = require("mongoose");
const UnauthSchema = mongoose.Schema({
    name : {type : String},
    mobile : {type : String},
    email : { type : String}
});

module.exports = Unauth = mongoose.model("Unauthorized",UnauthSchema);