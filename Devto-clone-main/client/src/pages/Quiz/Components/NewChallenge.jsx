import "./NewChallenge.css";
import { useRef, useState } from "react";
import useBase64 from "../../../hooks/useBase64";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function NewChallenge() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [badge, setBadge] = useState("");
  const [body, setBody] = useState("");
  const previewURL = useBase64(file);
  const badgeURL = useBase64(badge);
  const filePickerRef = useRef();
  const badgePickerRef = useRef();
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    try {
      const challenge = {
        title,
        description: body,
        imageUrl: previewURL,
        badgeTile: title + " Winner",
        badgeUrl: previewURL,
      };

      console.log(challenge,'challenge')
      const response = await axios.post(
        "http://localhost:5000/challenges",
        challenge
      );
      console.log(response,'res')
      setTitle("");
      setFile("");
      setBody("");

      navigate("/challenge");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <div className="header-container">
          <h1>Create a new challenge</h1>
        </div>
        <div className="title-container">
          <label>Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="image-container">
          <input
            type="file"
            ref={filePickerRef}
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <img
            src="../../../assets/images/save.png"
            alt="Please pick an image"
          />
          <button onClick={() => filePickerRef.current.click()}>
            Choose image
          </button>
        </div>
        <div className="desc-container">
          <label>Description</label>
          <input onChange={(e) => setBody(e.target.value)} />
        </div>
        {/* <div className="image-container">
          <input
            type="file"
            ref={badgePickerRef}
            onChange={(e) => setBadge(e.target.files[0])}
            style={{ display: "none" }}
          />
          <img
            src="../../../assets/images/badge.png"
            alt="Please pick an image"
          />
          <button onClick={() => badgePickerRef.current.click()}>
            Choose Badge
          </button>
        </div> */}
        <div className="btn-container">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
