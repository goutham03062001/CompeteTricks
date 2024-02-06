const mongoose = require("mongoose");
const BlankSchema = mongoose.Schema({
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
         
            answer:{type:String},
            year:{type:String}
            
        }
    ],
    BlankType : {
        type : String
    }
});

module.exports = Blanks = mongoose.model("Blanks",BlankSchema)