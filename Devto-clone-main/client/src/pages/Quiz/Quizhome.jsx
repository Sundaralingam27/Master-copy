import React from "react";
import { useNavigate } from "react-router-dom";
import "./Quizhome.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Quizhome() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    console.log(path,'path')
    navigate(path);
  };

  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const getChallenges = async () => {
      try {
        const res = await axios.get("http://localhost:5000/challenges");
        console.log(res.data);
        setChallenges(res.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    getChallenges();
  }, []);

  return (
    <div className="Quiz-container">
      <div className="header-container">
        <h1 className="quiz-header">Welcome to Dev challenges!</h1>
        <button
          className="challenge-btn"
          onClick={() => handleNavigate("/new-challenge")}
        >
          Create a Challenge
        </button>
      </div>
      <div className="cards-container">
        {challenges.map((challenge) => (
          <div key={challenge._id} className="card">
            <img src={challenge.imageUrl} alt={challenge.title} className="card-image"/>
            <div className="card-body">
              <h2 className="card-title">{challenge.title}</h2>
              <p className="card-text">{challenge.description}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleNavigate(`${challenge._id}`)}
              >
                Let's Start
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
