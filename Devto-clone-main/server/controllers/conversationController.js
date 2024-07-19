const Conversation = require("../model/Conversation");

const postConversation = async (req, res) => {
  console.log(req,'postConversation')
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserConversation = async (req, res) => {
  const conversation = await Conversation.find({
    members: { $in: [req.params.userId] },
  });
  res.status(200).json(conversation);
};

const getTwoUsersConversation = async (req, res) => {
  const conversation = await Conversation.findOne({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
  });
  res.status(200).json(conversation);
};

module.exports = {
  postConversation,
  getUserConversation,
  getTwoUsersConversation,
};
