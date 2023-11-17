import React from "react";
import Sidebar from "../components/Sidebar";
import Questions from "./QuestionsPage";
import "../styles/from.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <Questions />
    </div>
  );
};

export default HomePage;
