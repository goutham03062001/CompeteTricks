const Blanks = require("../models/Blanks");
const excelJs = require("exceljs");


const BlanksController = {
    
    uploadNewBlankPaper: async (req, res) => {
        try {
            var QuestionsArr = [];
            const fileBuffer = req.file.buffer;
    
            const workbook = new excelJs.Workbook();
            const worksheet = await workbook.xlsx.load(fileBuffer);
    
            const rows = worksheet.getWorksheet(1).getSheetValues();
            const headers = rows[1];
    
            for (let i = 2; i < rows.length; i++) {
                const currentRow = rows[i];
                if (currentRow) {
                    const quizFormData = {};
                    for (let j = 0; j < headers.length; j++) {
                        quizFormData[headers[j]] = currentRow[j];
                    }
                    
                    uploadStudentDetailsFunction1(quizFormData,QuestionsArr);
                    console.log("Inside main method ",QuestionsArr[1]);
                } else {
                    console.log('Encountered an undefined row at index:', i);
                }
            }
    
            console.log("new Blank Paper", QuestionsArr);
            const newBlankPaper = new Blanks({ Questions: QuestionsArr, BlankType: req.params.BlankPaperType });
            await newBlankPaper.save();
    
            return res.send("Blank Paper Uploaded Successfully!");
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'An error occurred while uploading Blank Paper' });
        }
    
        function uploadStudentDetailsFunction1(quizFormData,QuestionsArr) {
            const {
                QuestionName,
                Year,
                Answer
            } = quizFormData;
    
           
            
            const questionName = {
                richText: [
                    {  text: String(QuestionName) }
                ]
            };
            
            const Questions = {
                questionName: questionName,
                answer: Answer,
                year : Year
            };
            
            QuestionsArr.push(Questions);
            
            console.log("Qn - ",Questions.questionName)
            console.log("QuestionsArr , ",QuestionsArr);
        }
    },
    getAllBlanks: async(req,res)=>{
        try {
            const allBlanks = await Blanks.find();
            return res.send(allBlanks)
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
        }
    },

    getBlankById : async(req,res)=>{
        try {
            const isBlankExisted = await Blanks.findById({_id : req.params.BlankPaperId});
            if(isBlankExisted){
                return res.send(isBlankExisted)
            }else{
                return res.send("No Blank Paper Existed")
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    },
    removeBlankById : async(req,res)=>{
        try {
            const isBlankExisted = await Blanks.findByIdAndDelete({_id : req.params.BlankPaperId});
            if(isBlankExisted){
                const allBlanks = await Blanks.find();
                return res.send(allBlanks)
            }else{
                return res.send("No blank paper existed")
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    }
}

module.exports = BlanksController;