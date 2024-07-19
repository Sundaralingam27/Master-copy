import "./Message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({ message, own }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const getUrl = async () => {
      try {
        const res = await axios("//localhost:5000/users/");
        if (res.data) {
          const user = res.data.filter((f) => message.sender === f._id);
          setUrl(user[0]?.picture?.url)
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUrl();
  }, [message]);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={url}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
