const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

router.route('/').post(challengeController.postChallenge);

router.route('/').get(challengeController.getChallenges);

router.route('/:id').get(challengeController.getChallengebyId);

module.exports = router;