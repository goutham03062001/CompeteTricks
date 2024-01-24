const mongoose = require("mongoose");
const ModelPaperSchema = mongoose.Schema({

    Questions:[
        {
            questionName : {
                richText: [
                    {
                         // Adjust the type based on your needs
                        text: { type: String },
                    },
                ],
            },
            options:{
                    option1:{type:String},
                    option2:{type:String},
                    option3:{type:String},
                    option4:{type:String},
                },
            answer:{type:String},
            // year:{type:String}
            
        }
    ],
    ModelPaperType : {
        type : String
    }
});

module.exports = ModelPaper = mongoose.model("ModelPaper",ModelPaperSchema)