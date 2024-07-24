import React from "react";
import { useNavigate } from "react-router-dom";
import "./Quizhome.css";
import tw, { styled } from "twin.macro";

export default function Quizhome() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="Quiz-container">
      {/* <img
        className="Quiz-image"
        src="../../../assets/images/challenges.png"
        alt=""
      /> */}
      <div className="header-container">
      <h1 className="quiz-header">
        Welcome to Dev challenges!
      </h1>
      <button className="challenge-btn">Create a Challenge</button>
      </div>
      <div className="cards-container">
        <div className="card">
          <img src="../../../assets/images/react.png" alt="React Challenge" />
          <div className="card-body">
            <h2 className="card-title">React Challenge</h2>
            <p className="card-text">
              Take part in our React Challenge to improve your skills in
              building interactive web applications. Complete various tasks to
              learn about components, state, and hooks in React.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleNavigate("/ReactChallenge")}
            >
              Let's Start
            </button>
          </div>
        </div>
        <div className="card2">
          <img
            src="../../../assets/images/php.png"
            className="phpimage"
            alt="PHP Challenge"
          />
          <div className="card-body">
            <h2 className="card-title">PHP Challenge</h2>
            <p className="card-text">
              Take part in our PHP Challenge to improve your skills in building
              interactive web applications. Complete the quiz earn PHP master
              badge.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleNavigate("/php")}
            >
              Let's Start
            </button>
          </div>
        </div>
        <div className="card3">
          <img
            src="../../../assets/images/angular.png"
            alt="Angular Challenge"
          />
          <div className="card-body">
            <h2 className="card-title">Angular Challenge</h2>
            <p className="card-text">
              Take part in our Angular Challenge to improve your skills in
              building interactive web applications. Complete the quiz earn
              Angular master badge.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleNavigate("/angular")}
            >
              Let's Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
