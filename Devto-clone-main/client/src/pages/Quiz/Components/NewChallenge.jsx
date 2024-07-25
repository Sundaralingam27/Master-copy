import "./NewChallenge.css";
import { useRef, useState } from "react";
import useBase64 from "../../../hooks/useBase64";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function NewChallenge() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [badge, setBadge] = useState("");
  const [body, setBody] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const previewURL = useBase64(file);
  const badgeURL = useBase64(badge);
  const filePickerRef = useRef();
  const badgePickerRef = useRef();
  const excelPickerRef = useRef();
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

      console.log(challenge, 'challenge')
      const response = await axios.post(
        "http://localhost:5000/challenges",
        challenge
      );
      console.log(response, 'res')
      setTitle("");
      setFile("");
      setBody("");

      if (excelFile) {
        // Read the Excel file
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          // Format data
          const formattedQuestions = json.map((q) => ({
            question: q.Question,
            option1: q['Option A'],
            option2: q['Option A_1'],
            option3: q['Option A_2'],
            option4: q['Option A_3'],
            answer: q.Answer,
            challengeId: response.data._id, // Use the saved challenge ID
          }));

          // Send questions to server
          await axios.post("http://localhost:5000/questions/bulk", formattedQuestions);
          console.log('Questions uploaded successfully');
        };
        reader.readAsArrayBuffer(excelFile);
      }

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
        <div className="file-container">
          <input
            type="file"
            ref={excelPickerRef}
            onChange={(e) => setExcelFile(e.target.files[0])}
            style={{ display: "none" }}
            accept=".xlsx, .xls"
          />
          <button onClick={() => excelPickerRef.current.click()}>
            Upload Questions (Excel)
          </button>
        </div>
        <div className="btn-container">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
