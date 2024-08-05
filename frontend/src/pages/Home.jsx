import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Pic1 from "../assets/1.png";
import Pic2 from "../assets/2.png";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = location?.state?.token;

  if (!token) {
    navigate("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* images */}
      <div>
        <img
          src={Pic1}
          alt="pic1"
          style={{ position: "absolute", top: 200, left: 30 }}
        />

        <img
          src={Pic2}
          alt="pic1"
          style={{ position: "absolute", top: 200, right: 30, width: "250px" }}
        />
      </div>

      {/* main container */}
      <div
        style={{
          width: "30%",
          height: "100%",
          backgroundColor: "#e0e1dd",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "70px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <div
            style={{
              width: "25px",
              height: "25px",
              backgroundColor: "#333652",
              borderRadius: "50%",
            }}
          />

          <h1 style={{ color: "#333652" }}>Quiz Home</h1>
        </div>

        <button
          onClick={() => {
            navigate("/quizlist", { state: { token } });
          }}
          style={{
            width: "150px",
            height: "50px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Quizzes
        </button>

        <button
          onClick={() => {
            navigate("/createquiz", { state: { token } });
          }}
          style={{
            width: "150px",
            height: "50px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Create Quiz
        </button>

        <button
          onClick={() => {
            navigate("/favorite", { state: { token } });
          }}
          style={{
            width: "150px",
            height: "50px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Favorites
        </button>

        <button
          onClick={() => {
            navigate("/publish-quiz", { state: { token } });
          }}
          style={{
            width: "150px",
            height: "50px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Publish Quiz
        </button>

        <button
          onClick={() => {
            navigate("/profile", { state: { token } });
          }}
          style={{
            width: "150px",
            height: "50px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Profile
        </button>

        <button
          onClick={() => {
            navigate("/", { state: { token } });
          }}
          style={{
            width: "150px",
            height: "50px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
            marginBottom: "30px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
