const Question = require("../model/questions");

const postQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(200).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionsByChallengeId = async (req, res) => {
  try {
    const questions = await Question.find({ challengeId: req.params.challengeId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bulkInsertQuestions = async (req, res) => {
  try {
    const questions = req.body;
    await Question.insertMany(questions);
    res.status(200).json({ message: 'Questions inserted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postQuestion,
  getQuestionsByChallengeId,
  bulkInsertQuestions
};
