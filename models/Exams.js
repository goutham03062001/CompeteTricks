const mongoose = require("mongoose");
const ExamSchema = mongoose.Schema({
    examName : {type : String},
    examLink : {type : String},
    description:{type : String}
});

module.exports = ExamModel = mongoose.model("Exams",ExamSchema);