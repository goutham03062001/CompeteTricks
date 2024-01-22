const excelJs = require("exceljs");
const QuizModel = require("../models/QuizModel");
const ModelPaper = require("../models/ModelPapers");
const QuizAttempt = require("../models/QuizAttempt");
const Auth = require("../models/Auth")
const QuizController = {

    upload:async(req,res)=>{
        try {
            const QuestionsArr = [];
            const fileBuffer = req.file.buffer;
            console.log(fileBuffer)
            const workbook = new excelJs.Workbook();
            const worksheet = await workbook.xlsx.load(fileBuffer);
        
            const rows = worksheet.getWorksheet(1).getSheetValues();
            const ModelPapers = [];
            console.log("rows length "+rows.length);
            // Assuming the first row in the Excel sheet contains headers
            const headers = rows[1];
            console.log("headers - ",headers)
            // console.log(rows);
            // for (let i = 1; i < rows.length; i++) {
            //   console.log('Row:', rows[i]);
            //   const student = {};
            //   for (let j = 0; j < headers.length; j++) {
            //     student[headers[j]] = rows[i][j];
            //   }
            //   ModelPapers.push(student);
            // }

            for (let i = 1; i < rows.length-1; i++) {
              const currentRow = rows[i];
              
              // Check if the current row is defined
              if (currentRow) {
                const student = {};
                for (let j = 0; j < headers.length; j++) {
                  student[headers[j]] = currentRow[j];
                }
                ModelPapers.push(student);
              } else {
                console.log('Encountered an undefined row at index:', i);
              }
            }
        
            // Insert student data into the MongoDB collection
            // await Student.insertMany(ModelPapers);
            console.log("Quiz Data",ModelPapers); 
            
           ModelPapers.splice(1,ModelPapers.length).map((everyStudent)=>{
          
              uploadStudentDetailsFunction(everyStudent)
                
           });
        //    return res.send("Data Uploaded Successfully")
           async function uploadStudentDetailsFunction(quizFormData){
            const {
               QuestionName,
               Option1,
               Option2,
               Option3,
               Option4,
               Year,
               Answer
              } = quizFormData;
            // uploadStudentDetailsFunction
            const inputDate = new Date("Tue Mar 06 2001 05:30:00 GMT+0530 (India Standard Time)");

const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);
            

            const Options = {
                  option1:Option1,
                  option2:Option2,
                  option3:Option3,
                  option4:Option4
                };
                const Questions = 
                    {
                        questionName:QuestionName,
                        options:Options,
                        year:Year,
                        answer:Answer
                    }
                  ;
                  QuestionsArr.push(Questions);
                  
                
           }
           console.log("newQuiz",QuestionsArr);
           const newQuiz = new QuizModel({Questions:QuestionsArr});
                  await newQuiz.save();
          
                return res.send("Quiz Uploaded Successfully!")
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while uploading data' });
          }
    },

    uploadModelPapers : async(req,res)=>{
      try {
       console.log("Model Paper Type - ",req.params.ModelPaperType)
        const QuestionsArr = [];
        const fileBuffer = req.file.buffer;
        console.log(fileBuffer)
        const workbook = new excelJs.Workbook();
        const worksheet = await workbook.xlsx.load(fileBuffer);
    
        const rows = worksheet.getWorksheet(1).getSheetValues();
        const ModelPapers = [];
        console.log("rows length "+rows.length);
        // Assuming the first row in the Excel sheet contains headers
        const headers = rows[1];
        console.log("headers - ",headers)
        // console.log(rows);
        // for (let i = 1; i < rows.length; i++) {
        //   console.log('Row:', rows[i]);
        //   const student = {};
        //   for (let j = 0; j < headers.length; j++) {
        //     student[headers[j]] = rows[i][j];
        //   }
        //   ModelPapers.push(student);
        // }

        for (let i = 1; i < rows.length-1; i++) {
          const currentRow = rows[i];
          
          // Check if the current row is defined
          if (currentRow) {
            const student = {};
            for (let j = 0; j < headers.length; j++) {
              student[headers[j]] = currentRow[j];
            }
            ModelPapers.push(student);
          } else {
            console.log('Encountered an undefined row at index:', i);
          }
        }
    
        // Insert student data into the MongoDB collection
        // await Student.insertMany(ModelPapers);
        console.log("Quiz Data",ModelPapers); 
        
       ModelPapers.splice(1,ModelPapers.length).map((everyStudent)=>{
      
          uploadStudentDetailsFunction1(everyStudent)
            
       });
    //    return res.send("Data Uploaded Successfully")
       async function uploadStudentDetailsFunction1(quizFormData){
        const {
           QuestionName,
           Option1,
           Option2,
           Option3,
           Option4,
           Year,
           Answer
          } = quizFormData;
        // uploadStudentDetailsFunction
        const inputDate = new Date("Tue Mar 06 2001 05:30:00 GMT+0530 (India Standard Time)");

const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);
        
console.log("Year",Year);
        const Options = {
              option1:Option1,
              option2:Option2,
              option3:Option3,
              option4:Option4
            };
            const Questions = 
                {
                    questionName:QuestionName,
                    options:Options,
                    // year:Year,
                    answer:Answer
                }
              ;
              QuestionsArr.push(Questions);
              
            
       }
       console.log("new Model Paper",QuestionsArr);
      //  const ModelPaperType = req.body;
      //  console.log("Your req body - ",req.body)
       const newQuiz = new ModelPaper({Questions:QuestionsArr,ModelPaperType:req.params.ModelPaperType});
              await newQuiz.save();
      
            return res.send("Model Paper Uploaded Successfully!")
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'An error occurred while uploading Model Paper' });
      }
    },
    getAllQuiz: async(req,res)=>{
      const quizData = await QuizModel.find();
      console.log("quiz details ",quizData);
      return res.send(quizData);
    },
    getQuizDetailsById: async(req,res)=>{
      try {
        const quizById = await QuizModel.findById({_id : req.params.quizId});
        if(quizById){
          return res.send(quizById);
          // return res.send("removed successfully");
          return
        }else{
          return res.send("No quiz found with provided id");
        }
      } catch (error) {
        return res.send("Error Occurred!"+error.message)
      }
    },
    removeQuizById: async(req,res)=>{
      try {
        const quizById = await QuizModel.findOneAndDelete({_id:req.params.quizId});
        console.log('quiz id - ',req.params.quizId);
        console.log("Quiz Details - "+quizById);
        if(quizById){
          const allQuizzes = await QuizModel.find();
          return res.send(allQuizzes);
        }
        else{
          return res.send("No quiz found with provided id")
        }
      } catch (error) {
        return res.send("Error Occurred!"+error.message)
        
      }
    },
    updateQuizAttempt: async(req,res)=>{
      try {
        // const 
        const {quizId,userId} = req.params;
        const {score} = req.body;
        // const quizAttempt = new QuizAttempt({
        //   quiz : quizId,
        //   user : userId,
        //   score : score
        // });
        // await quizAttempt.save();

        // // Update the user's quizAttempts array using Mongoose findByIdAndUpdate
        // const updatedUser = await Auth.findByIdAndUpdate(
        //   userId,
        //   { $push: { quizAttempts: { _id: quizAttempt._id, score: score } } },
        //   { new: true, useFindAndModify: false }
        // );
    
        // console.log("Quiz attempt added to user:", updatedUser);
        // return res.send("Quiz attempt added to user: " + updatedUser);
        const currentUser = await Auth.findById({_id : userId});
        // if(currentUser.quizAttempts.)
        const isReattempted = currentUser.quizAttempts.some(attempt=>attempt.quiz.quizId === quizId);
        console.log("isReattempted - ",isReattempted);
        if(isReattempted){
          const quizObj = currentUser.quizAttempts.find(attempt=>attempt.quiz.quizId === quizId);
          quizObj.quiz.scoresArr.push(score);
          quizObj.quiz.count = quizObj.quiz.scoresArr.length;
          // return res.send(quizObj)
        }else{
          let scoresArr = [];
          scoresArr.push(score);
          const quiz = {quizId:quizId,userId : userId,count:1,scoresArr:scoresArr};
          currentUser.quizAttempts.push({quiz:quiz});
        }
        await currentUser.save();
        return res.send(currentUser);
        // return res.send(currentUser)
      } catch (error) {
        console.error(error);
        return res.status(500).send("Error occurred: " + error.message);
      }
    },
    getAllModelPapersByType: async(req,res)=>{
      try {
        const modelPapers = await ModelPaper.find({ModelPaperType:req.params.ModelPaperType});
        console.log("modelPapers",modelPapers)
        return res.send(modelPapers);
      } catch (error) {
        return res.send("Error Occurred - ",error.message)
      }
    },
    getAllModelPapers: async(req,res)=>{
      try {
        const modelPapers = await ModelPaper.find();
        console.log("modelPapers",modelPapers)
        return res.send(modelPapers);
      } catch (error) {
        return res.send("Error Occurred - ",error.message)
      }
    },
    getModelPaperById : async(req,res)=>{
      try {
        const modelPaper = await ModelPaper.findById({_id : req.params.ModelPaperId});
        if(modelPaper){
          return res.send(modelPaper)
        }else{
          return res.send("No model paper found with provided id")
        }
      } catch (error) {
        return res.send("Error Occurred - ",error.message)
      }
    },
    deleteModelPaperById : async(req,res)=>{
      try {
        const modelPaper = await ModelPaper.findByIdAndDelete({_id : req.params.ModelPaperId});
        return res.send("model paper deleted")
      } catch (error) {
        return res.send("Error Occurred - ",error.message)
        
      }
    }
}

module.exports = QuizController