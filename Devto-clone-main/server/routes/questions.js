const express = require("express");
const router = express.Router();
const {
  postQuestion,
  getQuestionsByChallengeId,
  bulkInsertQuestions
} = require("../controllers/questionController");

router.post("/", postQuestion);
router.get("/challenge/:challengeId", getQuestionsByChallengeId);
router.post("/bulk", bulkInsertQuestions);

module.exports = router;
