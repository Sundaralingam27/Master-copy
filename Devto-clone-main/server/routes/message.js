const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.route('/').post(messageController.postMessage);

router.route('/:conversationId').get(messageController.getMessage);

module.exports = router;
