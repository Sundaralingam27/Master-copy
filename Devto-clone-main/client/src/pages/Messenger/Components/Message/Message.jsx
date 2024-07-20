import "./Message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({ message, own }) {
  const [userPictureUrl, setUserPictureUrl] = useState(null);

  // Fetch user picture URL
  useEffect(() => {
    const getUserPicture = async () => {
      try {
        const res = await axios("//localhost:5000/users/");
        if (res.data) {
          const user = res.data.find((f) => message.sender === f._id);
          setUserPictureUrl(user?.picture?.url);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserPicture();
  }, [message]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={userPictureUrl} alt="" />
        <div className="messageContent">
          {message.text && <p className="messageText">{message.text}</p>}
          {message.fileUrl && (
            <div className="file-attachment">
              {message.fileUrl.match(/\.(jpg|jpeg|png|gif)$/) ? (
                <img
                  src={`http://localhost:5000${message.fileUrl}`}
                  alt="Attachment"
                  className="attachmentImg"
                />
              ) : (
                <a
                  href={message.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="attachmentLink"
                >
                  View File
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
