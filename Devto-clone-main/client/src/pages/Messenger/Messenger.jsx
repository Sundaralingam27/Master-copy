import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import socketContext from "../../context/SocketContext";
import { selectCurrentUser } from "../../core/features/auth/authSlice";
import { useGetUserDashboardQuery } from "../../core/features/users/usersApiSlice";
import ChatOnline from "./Components/ChatOnline/ChatOnline";
import Conversation from "./Components/Conversations/Conversations";
import Message from "./Components/Message/Message";
import "./Messenger.css";
import { FaPaperclip, FaSmile } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

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
      socket.current.emit("addUser", user._id);

      const handleGetUsers = (users) => {
        setOnlineUsers(
          user.following.filter((followingUser) =>
            users.some((onlineUser) => onlineUser.userId === followingUser._id)
          )
        );
      };

      socket.current.on("getUsers", handleGetUsers);

      return () => {
        socket.current.off("getUsers", handleGetUsers);
      };
    }
  }, [user]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (user) {
        try {
          const res = await axios.get(
            `//localhost:5000/conversations/${userId}`
          );
          setConversations(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchConversations();
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat) {
        try {
          const res = await axios.get(
            `//localhost:5000/messages/${currentChat._id}`
          );
          setMessages(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchMessages();
  }, [currentChat]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Upload file if a file is selected
      let fileUrl = "";
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
          const response = await axios.post(
            "http://localhost:5000/upload",
            formData
          );
          fileUrl = response.data.fileUrl;
          setSelectedFile(null); // Reset the selected file after upload
          setSelectedFileName(""); // Reset the selected file name after upload
        } catch (error) {
          console.error(error);
          return; // Exit the function if the file upload fails
        }
      }

      // Create the message object
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
        fileUrl, // Include the file URL if a file was uploaded
      };

      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
        fileUrl, // Include the file URL if a file was uploaded
      });

      try {
        const res = await axios.post("//localhost:5000/messages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.error(err);
      }
    },
    [currentChat, messages, newMessage, user, selectedFile]
  );

  const filterUsers = async (userName) => {
    try {
      if (userName) {
        const res = await axios.get(`//localhost:5000/users/find/${userName}`);
        if (res?.data) {
          const result = await axios.get(
            `//localhost:5000/conversations/find/${userId}/${res.data._id}`
          );
          setConversations([result.data]);
        } else {
          setConversations([]);
        }
      } else {
        const res = await axios.get(`//localhost:5000/conversations/${userId}`);
        setConversations(res.data);
      }
    } catch (err) {
      console.error(err);
      setConversations([]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    }
  };

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            placeholder="Search for friends"
            className="chatMenuInput"
            onChange={(event) => filterUsers(event.target.value)}
          />
          {conversations.map((c) => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} isSelected={currentChat && currentChat._id === c._id}/>
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div key={m._id} ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="file-icon">
                  <FaPaperclip />
                </label>
                <input
                  className="chatMessageInput"
                  placeholder="Type a message..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={selectedFileName ? selectedFileName : newMessage}
                />
                <button className="send-button" onClick={handleSubmit}>
                  <AiOutlineSend />
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
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
