import ChatOnline from "./Components/ChatOnline/ChatOnline";
import Conversation from "./Components/Conversations/Conversations";
import Message from "./Components/Message/Message";
import "./Messenger.css";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import socketContext from "../../context/SocketContext";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../core/features/auth/authSlice";
import { useGetUserDashboardQuery } from "../../core/features/users/usersApiSlice";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  const currentUser = useSelector(selectCurrentUser);
  const { data: user } = useGetUserDashboardQuery(currentUser.username);
  const userId = currentUser?.id;

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user) {
      // Emit addUser event to inform server of current user's connection
      socket.current.emit("addUser", user._id);

      // Define a handler for getUsers event
      const handleGetUsers = (users) => {
        // Update onlineUsers state based on user.following and server's response
        setOnlineUsers(
          user.following.filter((followingUser) =>
            users.some((onlineUser) => onlineUser.userId === followingUser._id)
          )
        );
      };

      // Listen for getUsers event from server
      socket.current.on("getUsers", handleGetUsers);

      // Clean up event listener when component unmounts or when user changes
      return () => {
        socket.current.off("getUsers", handleGetUsers);
      };
    }
  }, [user, socket]); // Ensure socket is included in dependency array if it's a ref

  useEffect(() => {
    const getConversations = async () => {
      if (user) {
        try {
          const res = await axios.get(
            "//localhost:5000/conversations/" + userId
          );
          setConversations(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await axios.get("//localhost:5000/messages/" + userId);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });

      try {
        const res = await axios.post("/messages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    },
    [currentChat, messages, newMessage, user]
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations.map((c) => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <>
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div key={m._id} ref={scrollRef}>
                  <Message message={m} own={m.sender === user._id} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={userId}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
  );
}
