const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/').post(conversationController.postConversation);

router.route('/:userId').get(conversationController.getUserConversation);

router.route('/find/:firstUserId/:secondUserId').get(conversationController.getTwoUsersConversation);

module.exports = router;

