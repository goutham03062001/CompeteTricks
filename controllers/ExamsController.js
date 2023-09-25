const ExamModel = require("../models/Exams");

//Only First 7 Exams should be visible in the Week
//Other exams must be inside the previous exams

const ExamController = {
    CreateNewExam: async (req,res)=>{
        try {
            const {examName,examLink,description} = req.body;
            const newExam = new ExamModel({examName,examLink,description});
            await newExam.save();
            return res.json(newExam); 
        } catch (error) {
         return res.send("Error Occurred !"+error.message)   
        }
    },
    CurrentWeekExams : async (req,res)=>{
        try {
            const allExams = await ExamModel.find();
            const currentWeekExams = allExams.slice(0,7);

            if(currentWeekExams<1){
                return res.json({message : "You don't have any exams this week"});
            }else{

                return res.json(currentWeekExams);
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
        }
    },
    DeleteExam : async (req,res)=>{
        try {
            const {examId} = req.params;
            const exam = await ExamModel.findOneAndDelete({_id : examId});
            return res.send("Exam Deleted Successfully!");
        } catch (error) {
         return res.send("Error Occurred !"+error.message)   
            
        }
    }
}

module.exports = ExamController