let onlineUsers = [];

const addUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

const socketHandlers = (io) => {
  return io.on("connection", (socket) => {
    const handler = (sender, receiver, { type, reactionType, post }) => {
      const receiverSocket = getUser(receiver.userId);
      if (receiverSocket && sender.id !== receiver.id) {
        io.to(receiverSocket.socketId).emit("notificationReceived", {
          sender,
          receiverUsername: receiver.username,
          type,
          reactionType,
          post,
        });
      }
    };

    socket.on("join", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", onlineUsers);
    });

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", onlineUsers);
    });
  
    socket.on("follow", ({ sender, receiver }) => {
      handler(sender, receiver, { type: "follow" });
    });

    socket.on("react", ({ sender, receiver, reactionType, post }) => {
      handler(sender, receiver, { type: "react", reactionType, post });
    });

    socket.on("comment", ({ sender, receiver, post }) => {
      handler(sender, receiver, { type: "comment", post });
    });

    socket.on("post", ({ sender, receivers, post }) => {
      receivers.map((receiver) => {
        handler(sender, receiver, { type: "post", post });
      });
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      }
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("getUsers", onlineUsers);
    });
  });
};

module.exports = socketHandlers;
