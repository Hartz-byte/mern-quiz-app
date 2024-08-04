import { useLocation, useNavigate } from "react-router-dom";
import { AutoTabProvider } from "react-auto-tab";
import { useEffect, useState } from "react";
import axios from "axios";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

function Deactivate() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = location?.state?.token;

  const state = location.state;
  const [otp, setOtp] = useState();
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");
  const [flag, setFlag] = useState(true);
  const [color, setColor] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleOtp1Change(evt) {
    setOtp1(evt.target.value);
  }

  function handleOtp2Change(evt) {
    setOtp2(evt.target.value);
  }

  function handleOtp3Change(evt) {
    setOtp3(evt.target.value);
  }

  function handleOtp4Change(evt) {
    setOtp4(evt.target.value);
  }

  function handleOtp5Change(evt) {
    setOtp5(evt.target.value);
  }

  function handleOtp6Change(evt) {
    setOtp6(evt.target.value);
  }

  function handleResendClick(evt) {
    evt.preventDefault();
    setErrors([]);
    setIsLoading(true);
    const token = state.token;
    axios
      .get(`http://localhost:3002/auth/resend-registration-otp/${token}`)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        const message = error.response.data.message;
        setIsLoading(false);
        if (error.response.status === 500) {
          setErrors(["Try again after some time"]);
        }
        if (message.includes("Resend OTP")) {
          setErrors([message]);
        }
        if (message.includes("Already Verified your Account")) {
          setErrors((oldArray) => {
            if (oldArray.includes("Account already registered, login")) {
              return [...oldArray];
            }
            return [...oldArray, "Account already registered, login"];
          });
        }
      });
  }

  function handleVerifyClick(evt) {
    evt.preventDefault();
    setErrors([]);
    setColor("");
    setIsLoading(true);
    if (!otp1 || otp1 === undefined) {
      setErrors((oldArray) => {
        if (oldArray.includes("Please enter OTP")) {
          return [...oldArray];
        }
        return [...oldArray, "Please enter OTP"];
      });
    }
    if (!otp2 || otp2 === undefined) {
      setErrors((oldArray) => {
        if (oldArray.includes("Please enter OTP")) {
          return [...oldArray];
        }
        return [...oldArray, "Please enter OTP"];
      });
    }
    if (!otp3 || otp3 === undefined) {
      setErrors((oldArray) => {
        if (oldArray.includes("Please enter OTP")) {
          return [...oldArray];
        }
        return [...oldArray, "Please enter OTP"];
      });
    }
    if (!otp4 || otp4 === undefined) {
      setErrors((oldArray) => {
        if (oldArray.includes("Please enter OTP")) {
          return [...oldArray];
        }
        return [...oldArray, "Please enter OTP"];
      });
    }
    if (!otp5 || otp5 === undefined) {
      setErrors((oldArray) => {
        if (oldArray.includes("Please enter OTP")) {
          return [...oldArray];
        }
        return [...oldArray, "Please enter OTP"];
      });
    }
    if (!otp6 || otp6 === undefined) {
      setErrors((oldArray) => {
        if (oldArray.includes("Please enter OTP")) {
          return [...oldArray];
        }
        return [...oldArray, "Please enter OTP"];
      });
    }
    setOtp(otp1 + otp2 + otp3 + otp4 + otp5 + otp6);
    setFlag(!flag);
  }

  useEffect(() => {
    if (!errors.includes("Please enter OTP")) {
      const otpToNumber = parseInt(otp);
      if (otpToNumber) {
        const token = state.token;
        axios
          .post(`http://localhost:3002/auth/verify-registration-otp/${token}`, {
            otp,
          })
          .then((response) => {
            setIsLoading(false);
            setErrors((oldArray) => {
              if (oldArray.includes("Account registered, please login")) {
                return [...oldArray];
              }
              return [...oldArray, "Account registered, please login"];
            });
            setColor("black");
          })
          .catch((error) => {
            const message = error.response.data.message;
            setIsLoading(false);
            if (error.response.status === 500) {
              setErrors(["Try again after some time"]);
            }
            if (
              message.includes("OTP has not send on this email or Invalid OTP")
            ) {
              setErrors((oldArray) => {
                if (oldArray.includes("OTP expired, please resend")) {
                  return [...oldArray];
                }
                return [...oldArray, "OTP expired, please resend"];
              });
            }
            if (message.includes("Incorrect OTP")) {
              setErrors((oldArray) => {
                if (oldArray.includes("Incorrect OTP")) {
                  return [...oldArray];
                }
                return [...oldArray, "Incorrect OTP"];
              });
            }
            if (message.includes("User already exist")) {
              setErrors((oldArray) => {
                if (oldArray.includes("Account already registered, login")) {
                  return [...oldArray];
                }
                return [...oldArray, "Account already registered, login"];
              });
            }
          });
      } else if (!isNaN(otpToNumber)) {
        setErrors((oldArray) => {
          if (oldArray.includes("Please enter OTP")) {
            return [...oldArray];
          }
          return [...oldArray, "Please enter OTP"];
        });
      }
    } else {
      setIsLoading(false);
    }
  }, [otp, flag]);

  if (state === null) {
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
          style={{ position: "absolute", top: 150, left: 30 }}
        />

        <img
          src={Pic2}
          alt="pic1"
          style={{ position: "absolute", top: 300, right: 30, width: "250px" }}
        />
      </div>

      {/* side btns */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "absolute",
          top: "5%",
          right: "5%",
        }}
      >
        <button
          onClick={() => {
            navigate("/home", { state: { token } });
          }}
          style={{
            width: "100px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Home
        </button>

        <button
          onClick={() => {
            navigate("/quizlist", { state: { token } });
          }}
          style={{
            width: "100px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Quizzes
        </button>

        <button
          onClick={() => {
            navigate("/profile", { state: { token } });
          }}
          style={{
            width: "100px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Profile
        </button>

        <button
          onClick={() => {
            navigate("/");
          }}
          style={{
            width: "100px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Logout
        </button>
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
          gap: "10px",
          marginTop: "80px",
        }}
      >
        <div>
          <h2 style={{ color: "#333652" }}>Quiz App</h2>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </button>
        </div>
        <div>
          <div>
            <h2 style={{ color: "#333652" }}>Register yourself!</h2>
            <div style={{ color: "#333652" }}>Enter OTP</div>

            <AutoTabProvider settings={{ tabOnMax: true }}>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <div>
                  <label htmlFor="OTP"></label>
                  <input
                    type="text"
                    value={otp1}
                    maxLength={1}
                    onChange={handleOtp1Change}
                    tabbable="true"
                    style={{
                      width: "50px",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="OTP"></label>
                  <input
                    type="text"
                    value={otp2}
                    maxLength={1}
                    onChange={handleOtp2Change}
                    tabbable="true"
                    style={{
                      width: "50px",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="OTP"></label>
                  <input
                    type="text"
                    value={otp3}
                    maxLength={1}
                    onChange={handleOtp3Change}
                    tabbable="true"
                    style={{
                      width: "50px",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="OTP"></label>
                  <input
                    type="text"
                    value={otp4}
                    maxLength={1}
                    onChange={handleOtp4Change}
                    tabbable="true"
                    style={{
                      width: "50px",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="OTP"></label>
                  <input
                    type="text"
                    value={otp5}
                    maxLength={1}
                    onChange={handleOtp5Change}
                    tabbable="true"
                    style={{
                      width: "50px",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="OTP"></label>
                  <input
                    type="text"
                    value={otp6}
                    maxLength={1}
                    onChange={handleOtp6Change}
                    tabbable="true"
                    style={{
                      width: "50px",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
              </div>
            </AutoTabProvider>
            <div>
              <button
                onClick={handleResendClick}
                style={{
                  marginBottom: "10px",
                  borderRadius: "4px",
                  backgroundColor: "#333652",
                  color: "white",
                  padding: "5px",
                }}
              >
                Resend
              </button>
            </div>
            <div>
              <p style={{ color: "#333652" }}>
                Note: An OTP has been sent on your email. Please verify.
              </p>
            </div>
            {errors.length > 0 && (
              <div>
                <ul>
                  {errors.map((message) => {
                    return <li key={message}>{message}</li>;
                  })}
                </ul>
              </div>
            )}
            <button
              type="submit"
              onClick={handleVerifyClick}
              style={{
                marginBottom: "15px",
                borderRadius: "4px",
                backgroundColor: "#333652",
                color: "white",
                padding: "5px 10px",
                marginLeft: "400px",
              }}
            >
              Verify
            </button>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deactivate;
