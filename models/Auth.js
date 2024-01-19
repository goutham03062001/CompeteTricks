const mongoose = require("mongoose");
const AuthSchema = mongoose.Schema({
    name : {type : String},
    email : {type : String},
    mobile : {type : String},
    password : {type : String},
    dob : {type : String},
    address:{type:String},
    isAuthenticated:{type : Boolean, default:false},
    quizAttempts:[
        {
            quiz:{
                quizId : {type : String},
                userId:{type : String},
                scoresArr : [],
                count : {type : String}
            }
        },
    ]
});

module.exports = Auth = mongoose.model("AuthUsers",AuthSchema);