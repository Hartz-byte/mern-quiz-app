import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

const RegisterLogin = () => {
  const navigate = useNavigate();

  const [loginOpen, setLoginOpen] = useState(false);
  const [error, setError] = useState("");
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginOpen = () => {
    setLoginOpen(!loginOpen);
  };

  // handle registration text change
  const handleRegistrationChange = (event) => {
    const { name, value } = event.target;

    setRegistrationData((prevregistrationData) => ({
      ...prevregistrationData,
      [name]: value,
    }));
  };

  // handle login text change
  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginData((prevreLoginData) => ({
      ...prevreLoginData,
      [name]: value,
    }));
  };

  // handle registration
  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/auth/",
        registrationData
      );

      setRegistrationData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setError("");

      // console.log("token", response.data.data.token);

      navigate("/verifyaccount", {
        state: { token: response.data.data.token },
      });

      console.log("Registration successful");
    } catch (error) {
      setError(error.message);
      console.error("Registration failed:", error);
    }
  };

  // handle login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/auth/login",
        loginData
      );

      if (response) {
        const token = response?.data?.data?.token;

        setLoginData({
          email: "",
          password: "",
        });

        setError("");

        console.log("Login successful");

        navigate("/home", { state: { token } });
      }
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error);
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

      {/* main container */}
      <div
        style={{
          width: "40%",
          height: "100%",
          backgroundColor: "#e0e1dd",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "70px",
        }}
      >
        {!loginOpen ? (
          // register
          <div>
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
            <h2 style={{ color: "#333652" }}>Create an account.</h2>

            {/* Already have an account? text */}
            <p style={{ color: "#333652" }}>
              Already have an account?{" "}
              <span onClick={handleLoginOpen} style={{ cursor: "pointer" }}>
                Log in
              </span>
            </p>

            {/* input areas */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* name */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleRegistrationChange}
                style={{
                  width: "222px",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />

              {/* email */}
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleRegistrationChange}
                style={{
                  width: "222px",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />

              {/* password */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleRegistrationChange}
                style={{
                  width: "222px",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />

              {/* confirm password */}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleRegistrationChange}
                style={{
                  width: "222px",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />
            </div>

            {error ? (
              <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
            ) : null}

            {/* submit button */}
            <button
              style={{
                margin: "30px 80px",
                padding: "10px 20px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
              onClick={handleRegistration}
            >
              Register
            </button>
          </div>
        ) : (
          // log in
          <div>
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
            <h2 style={{ color: "#333652" }}>Log In.</h2>

            {/* Don't have an account? text */}
            <p style={{ color: "#333652" }}>
              Don't have an account?{" "}
              <span onClick={handleLoginOpen} style={{ cursor: "pointer" }}>
                Register
              </span>
            </p>

            {/* input areas */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* email */}
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleLoginChange}
                style={{
                  width: "222px",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />

              {/* password */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleLoginChange}
                style={{
                  width: "222px",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />
            </div>

            {/* login button */}
            <button
              style={{
                margin: "30px 80px",
                padding: "10px 20px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
              onClick={handleLogin}
            >
              Login
            </button>

            {/* Activate your account? text */}
            <p style={{ color: "#333652", marginLeft: "15px" }}>
              Activate your account?{" "}
              <span
                onClick={() => {
                  navigate("/verifyaccount");
                }}
                style={{ cursor: "pointer" }}
              >
                Activate
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterLogin;
