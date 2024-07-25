import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Questions.css";

const Questions = () => {
  const { challengeId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/questions/challenge/${challengeId}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [challengeId]);

  return (
    <div>
      <h1>Questions</h1>
        {questions.map((question) => (
          <div key={question._id} className="question-container">
            <div className="question">
                Question:{question.question}
             </div>
             <div className="options">
                Options:
                <span>A: {question.option1}</span>
                <span>B: {question.option2}</span>
                <span>C: {question.option3}</span>
                <span>D: {question.option4}</span>
             </div>
          </div>
        ))}
    </div>
  );
};

export default Questions;
