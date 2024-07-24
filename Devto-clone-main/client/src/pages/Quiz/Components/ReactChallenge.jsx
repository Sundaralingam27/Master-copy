import React, { useState } from "react";
import "./reactChallenge.css";

const quizQuestions = [
  {
    question: "What is the primary purpose of React?",
    options: [
      "To manage state",
      "To build user interfaces",
      "To handle routing",
      "To connect to databases",
    ],
    answer: "To build user interfaces",
  },
  {
    question: "What is a component in React?",
    options: ["A function", "A class", "A building block", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "What is JSX?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "Java Syntax",
      "None of the above",
    ],
    answer: "JavaScript XML",
  },
  {
    question: "How do you create a state in a functional component?",
    options: ["this.setState", "useState", "useContext", "useReducer"],
    answer: "useState",
  },
  {
    question: "Which hook is used to handle side effects in React?",
    options: ["useState", "useEffect", "useReducer", "useContext"],
    answer: "useEffect",
  },
];

const ReactChallenge = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleAnswerOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {quizQuestions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{quizQuestions.length}
            </div>
            <div className="question-text">
              {quizQuestions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className={`option-button ${
                  selectedOption === option ? "selected" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            className="next-button"
            disabled={!selectedOption}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default ReactChallenge;
