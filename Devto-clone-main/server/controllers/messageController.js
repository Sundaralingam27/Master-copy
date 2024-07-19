const Message = require("../model/Message");

const postMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  const savedMessage = await newMessage.save();
  res.status(200).json(savedMessage);
};

const getMessage = async (req, res) => {
    const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
    res.status(200).json(messages);
  };

  module.exports = {
    postMessage,
    getMessage
  };
