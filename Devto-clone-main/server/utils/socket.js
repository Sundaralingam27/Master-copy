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

const userSocketMap = {};

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

    const getAllConnectedClients = (roomId) => {
      // Map
      return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
          return {
            socketId,
            username: userSocketMap[socketId],
          };
        }
      );
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

    socket.on("join-room", ({ roomId, username }) => {
      userSocketMap[socket.id] = username;
      socket.join(roomId);
      const clients = getAllConnectedClients(roomId);
      console.log(clients,'clients emit')
      clients.forEach(({ socketId }) => {
        io.to(socketId).emit("joined-room", {
          clients,
          username,
          socketId: socket.id,
        });
      });
    });

    socket.on("code-change", ({ roomId, code }) => {
      socket.in(roomId).emit("code-change", { code });
    });

    socket.on("sync-code", ({ socketId, code }) => {
      io.to(socketId).emit("code-change", { code });
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("getUsers", onlineUsers);
    });

    socket.on('disconnecting', () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
          socket.in(roomId).emit("disconnected", {
              socketId: socket.id,
              username: userSocketMap[socket.id],
          });
      });
      delete userSocketMap[socket.id];
      socket.leave();
  });

  });
};

module.exports = socketHandlers;
