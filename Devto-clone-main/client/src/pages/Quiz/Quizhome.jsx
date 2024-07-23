import "./Quizhome.css";
import tw, { styled } from "twin.macro";

export default function Quizhome() {
  return (
    <div className="Quiz-container">
      <img
        className="Quiz-image"
        src="../../../assets/images/challenges.png"
        alt=""
      />
      <h1>Welcome to Dev challenges!</h1>
      <div className="cards-container">
        <div className="card">
          <img src="../../../assets/images/react.png"></img>
          <div className="card-body">
            <h2 class="card-title">React Challenge</h2>
            <p class="card-text">
              Take part in our React Challenge to improve your skills in
              building interactive web applications. Complete various tasks to
              learn about components, state, and hooks in React.
            </p>
            <button className="btn btn-primary">Let's Start</button>
          </div>
        </div>
        <div className="card2">
          <img src="../../../assets/images/php.png" className="phpimage"></img>
          <div className="card-body">
            <h2 class="card-title">PHP Challenge</h2>
            <p class="card-text">
              Take part in our PHP Challenge to improve your skills in building
              interactive web applications. Complete the quiz earn PHP master
              badge.
            </p>
            <button className="btn btn-primary">Let's Start</button>
          </div>
        </div>
        <div className="card3">
          <img src="../../../assets/images/angular.png"></img>
          <div className="card-body">
            <h2 class="card-title">Angular Challenge</h2>
            <p class="card-text">
              Take part in our Angular Challenge to improve your skills in
              building interactive web applications. Complete the quiz earn
              Angular master badge.
            </p>
            <button className="btn btn-primary">Let's Start</button>
          </div>
        </div>
      </div>
    </div>
  );
}
