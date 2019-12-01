var questionSchema = new mongoose.Schema({
    questionId: String,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    answer:String
});

module.exports = mongoose.model("questions", questionSchema);