const mongoose = require("mongoose");

const QuizAttemptSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUsers" },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    timestamp: { type: Date, default: Date.now },
    // Add any other relevant fields
});

module.exports = QuizAttempt = mongoose.model("QuizAttempt", QuizAttemptSchema);

