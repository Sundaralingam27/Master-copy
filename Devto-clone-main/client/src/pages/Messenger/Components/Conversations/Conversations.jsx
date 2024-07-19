import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios("//localhost:5000/users/");
        if (res.data) {
          const friend = res.data.filter((f) => friendId === f._id);
          setUser(friend[0])
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img className="conversationImg" src={user?.picture?.url} alt="" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
