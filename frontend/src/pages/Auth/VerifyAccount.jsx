import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

const VerifyAccount = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  //   const [otp, setOtp] = useState();
  const [activateData, setActivateData] = useState({
    email: "",
    key: "",
  });

  // handle activate text change
  const handleActivateChange = (event) => {
    const { name, value } = event.target;

    setActivateData((prevreLoginData) => ({
      ...prevreLoginData,
      [name]: value,
    }));
  };

  const handleVerifyAccount = async (event) => {
    event.preventDefault();

    const otp = parseInt(activateData.key);
    console.log(otp);

    if (otp) {
      const token = state.token;

      try {
        const response = await axios.post(
          `http://localhost:3002/auth/verify-registration-otp/${token}`,
          { otp }
        );

        navigate("/");

        console.log("Account verified successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleResendOtp = async (event) => {
    event.preventDefault();

    const token = state.token;
    try {
      const response = await axios.get(
        `http://localhost:3002/auth/resend-registration-otp/${token}`
      );

      console.log("OTP resend successfully");
    } catch (error) {
      console.log(error);
    }
  };

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

      <div
        style={{
          width: "40%",
          height: "100%",
          backgroundColor: "#e0e1dd",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "70px",
        }}
      >
        {/* circle and top text */}
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <div
            style={{
              width: "25px",
              height: "25px",
              backgroundColor: "#333652",
              borderRadius: "50%",
            }}
          />

          <h1 style={{ color: "#333652" }}>Create Quiz</h1>
        </div>

        {/* create an account text */}
        <h2 style={{ color: "#333652" }}>Verify your account.</h2>

        {/* Back to sign-in? text */}
        <p style={{ color: "#333652" }}>
          Log In?{" "}
          <span
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            Log In
          </span>
        </p>

        {/* input areas */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* email */}
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleActivateChange}
            style={{
              width: "222px",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          />

          {/* key */}
          <input
            type="text"
            name="key"
            placeholder="Key"
            onChange={handleActivateChange}
            style={{
              width: "222px",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          />
        </div>

        {/* resend otp text */}
        <p style={{ color: "#333652" }}>
          Didn't got the OTP?{" "}
          <span onClick={handleResendOtp} style={{ cursor: "pointer" }}>
            Resend OTP
          </span>
        </p>

        {/* verify button */}
        <button
          style={{
            margin: "30px 80px",
            padding: "10px 20px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
          onClick={handleVerifyAccount}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyAccount;
