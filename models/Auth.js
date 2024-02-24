const mongoose = require("mongoose");
const AuthSchema = mongoose.Schema({
    name : {type : String},
    email : {type : String},
    mobile : {type : String},
    password : {type : String},
    dob : {type : String},
    address:{type:String},
    isAuthenticated:{type : Boolean, default:false},
    deviceInfo:{
        brand: {type : String},
        modelName : {type : String},
        deviceType:{type : String},
    },
    uniqueToken:{ type : String},
    quizAttempts:[
        {
            quiz:{
                quizId : {type : String},
                userId:{type : String},
                scoresArr : [],
                count : {type : String}
            }
        },
    ],
    modelPaperAttempts:[
        {
            modelPaper:{
                modelPaperId : {type : String},
                userId:{type : String},
                scoresArr : [],
                count : {type : String}
            }
        },
    ]
});

module.exports = Auth = mongoose.model("AuthUsers",AuthSchema);