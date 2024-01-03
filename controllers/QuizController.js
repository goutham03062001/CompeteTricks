const excelJs = require("exceljs");
const QuizModel = require("../models/QuizModel");

const QuizController = {

    upload:async(req,res)=>{
        try {
            const QuestionsArr = [];
            const fileBuffer = req.file.buffer;
            console.log(fileBuffer)
            const workbook = new excelJs.Workbook();
            const worksheet = await workbook.xlsx.load(fileBuffer);
        
            const rows = worksheet.getWorksheet(1).getSheetValues();
            const studentData = [];
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
            //   studentData.push(student);
            // }

            for (let i = 1; i < rows.length-1; i++) {
              const currentRow = rows[i];
              
              // Check if the current row is defined
              if (currentRow) {
                const student = {};
                for (let j = 0; j < headers.length; j++) {
                  student[headers[j]] = currentRow[j];
                }
                studentData.push(student);
              } else {
                console.log('Encountered an undefined row at index:', i);
              }
            }
        
            // Insert student data into the MongoDB collection
            // await Student.insertMany(studentData);
            console.log("Quiz Data",studentData); 
            
           studentData.splice(1,studentData.length).map((everyStudent)=>{
          
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
    }
}

module.exports = QuizController