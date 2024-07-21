import "./Collab.css";
import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Collab() {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room ID & User Name is required");
      return;
    }

    // Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="session-container">
      <div className="session-form">
        <label className="session-form-label">Room ID<span className="required">*</span></label>
        <input
          type="text"
          placeholder="Room ID"
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
          onKeyUp={handleInputEnter}
          className="session-form-input"
          required
        />
        <label className="session-form-label">User Name<span className="required">*</span></label>
        <input
          type="text"
          placeholder="User Name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          onKeyUp={handleInputEnter}
          className="session-form-input"
          required
        />
        <button className="session-form-btn" onClick={joinRoom}>
          Join
        </button>
        <span className="createInfo">
          If you don't have an invite then create &nbsp;
          <a onClick={createNewRoom} href="" className="createNewBtn">
            new room
          </a>
        </span>
      </div>
    </div>
  );
}
