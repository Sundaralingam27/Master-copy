const Challenge = require("../model/Challenge");

const postChallenge = async (req, res) => {
  const newChallenge = new Challenge(req.body);

  const savedChallenge = await newChallenge.save();
  res.status(200).json(savedChallenge);
};

const getChallenges = async (req, res) => {
  const challanges = await Challenge.find({});
  res.status(200).json(challanges);
};

const getChallengebyId = async (req, res) => {
  const challanges = await Challenge.find({
    _id: req.params.conversationId,
  });
  res.status(200).json(challanges);
};

module.exports = {
    postChallenge,
    getChallenges,
    getChallengebyId
};
