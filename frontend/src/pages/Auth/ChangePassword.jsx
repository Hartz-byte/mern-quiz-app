import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

function ChangePassword() {
  let flag = 1;
  const navigate = useNavigate();
  const location = useLocation();

  const token = location?.state?.token;
  const headers = { Authorization: `Bearer ${token}` };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(["Testing"]);

  function handleCurrentPasswordChange(evt) {
    setCurrentPassword(evt.target.value);
  }

  function handleNewPasswordChange(evt) {
    setNewPassword(evt.target.value);
  }

  function handleConfirmPasswordChange(evt) {
    setConfirmPassword(evt.target.value);
  }

  function handleLogoutClick(evt) {
    setIsLoading(true);
    axios
      .post("http://localhost:3002/user/logout", {}, { headers })
      .then((response) => {
        setIsLoading(false);
        navigate("/auth/login");
      })
      .catch((error) => {
        setIsLoading(false);
        navigate("/auth/register");
      });
  }

  function handleVerifyClick(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setErrors([]);
    flag = 1;
    if (!currentPassword) {
      setErrors((oldArray) => {
        return [...oldArray, "Please enter current password"];
      });
    }
    if (!newPassword) {
      setErrors((oldArray) => {
        return [...oldArray, "Please enter new password"];
      });
    } else {
      if (
        newPassword.indexOf("!") === -1 &&
        newPassword.indexOf("@") === -1 &&
        newPassword.indexOf("#") === -1 &&
        newPassword.indexOf("$") === -1 &&
        newPassword.indexOf("*") === -1
      ) {
        flag = 0;
      }
      if (!flag) {
        setErrors((oldArray) => {
          return [...oldArray, "Enter the valid new password"];
        });
      }
      for (let index = 0; index < newPassword.length; index++) {
        if (
          newPassword.charAt(index) >= "a" &&
          newPassword.charAt(index) <= "z"
        ) {
          flag = 1;
          break;
        }
      }
      if (!flag) {
        setErrors((oldArray) => {
          return [...oldArray, "Enter the valid new password"];
        });
      }
      for (let index = 0; index < newPassword.length; index++) {
        if (
          newPassword.charAt(index) >= "A" &&
          newPassword.charAt(index) <= "Z"
        ) {
          flag = 1;
          break;
        }
      }
      if (!flag) {
        setErrors((oldArray) => {
          return [...oldArray, "Enter the valid new password"];
        });
      }
      for (let index = 0; index < newPassword.length; index++) {
        if (
          newPassword.charAt(index) >= "0" &&
          newPassword.charAt(index) <= "9"
        ) {
          flag = 1;
          break;
        }
      }
      if (!flag) {
        setErrors((oldArray) => {
          return [...oldArray, "Enter the valid new password"];
        });
      }
    }
    if (confirmPassword !== newPassword) {
      setErrors((oldArray) => {
        return [...oldArray, "Confirm password mismatch"];
      });
    }
  }

  useEffect(() => {
    if (errors.length === 0) {
      axios
        .put(
          "http://localhost:3002/user/changepassword",
          { currentPassword, newPassword, confirmPassword },
          { headers }
        )
        .then((response) => {
          setIsLoading(false);
          setErrors(["Password successfully changed, redirecting..."]);
          setTimeout(() => {
            navigate("/profile", { state: { token } });
          }, 1000);
        })
        .catch((error) => {
          setIsLoading(false);
          const message = error?.response?.data?.message;
          if (error?.response?.status === 500) {
            setErrors(["Try again after some time"]);
          }
          if (
            message.includes("Current Password is incorrect. Please try again.")
          ) {
            setErrors((oldArray) => {
              if (oldArray.includes("Current password is incorrect")) {
                return [...oldArray];
              }
              return [...oldArray, "Current password is incorrect"];
            });
          }
          if (message.includes("Same as current password. Try another one")) {
            setErrors((oldArray) => {
              if (
                oldArray.includes("New password is same as current password")
              ) {
                return [...oldArray];
              }
              return [...oldArray, "New password is same as current password"];
            });
          }
        });
    } else {
      setIsLoading(false);
    }
  }, [errors]);

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
          onClick={handleLogoutClick}
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

      {/* main container */}
      <div
        style={{
          width: "35%",
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
          <h2 style={{ color: "#333652" }}>Change password!</h2>
          <div>
            <input
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              placeholder="Current password"
              style={{
                width: "200px",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
          </div>
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="New password"
              style={{
                width: "200px",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
          </div>
          <div>
            <input
              type="text"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              style={{
                width: "200px",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
          </div>

          {errors.length > 0 && !errors.includes("Testing") && (
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
              marginTop: "10px",
              marginLeft: "85px",
              borderRadius: "4px",
              backgroundColor: "#333652",
              color: "white",
              padding: "5px 10px",
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
  );
}

export default ChangePassword;
