import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Pic1 from "../assets/1.png";
import Pic2 from "../assets/2.png";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = location?.state?.token;
  const headers = { Authorization: `Bearer ${token}` };

  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function handleLogoutClick(evt) {
    setIsLoading(true);

    navigate("/");
  }

  function handleMyAccountClick(evt) {
    navigate("/profile", { state: { token } });
  }

  function handleChangePasswordClick(evt) {
    navigate("/change-password", { state: { token } });
  }

  function handleNameEditClick(evt) {
    evt.preventDefault();
    navigate("/change-name", { state: { token } });
  }

  function handleDeactivateAccountClick(evt) {
    evt.preventDefault();
    setIsLoading(true);
    axios
      .patch("http://localhost:3002/user/deactivate", {}, { headers })
      .then((response) => {
        setIsLoading(false);
        navigate("/deactivate", { state: { token } });
      })
      .catch((error) => {
        setIsLoading(false);
        const message = error?.response?.data?.message;
        if (message.includes("Resend OTP after")) {
          const minute = message.charAt(17);
          if (minute == 0) {
            setErrors("Try again after 1 minute");
          } else {
            setErrors(`Try again after ${minute} minutes`);
          }
        } else {
          navigate("/auth/login");
        }
      });
  }

  useEffect(() => {
    if (!!token) {
      axios
        .get("http://localhost:3002/user", { headers })
        .then((response) => {
          setIsLoading(false);
          const data = response.data.data;
          setId(data._id);
          setName(data.name);
          setEmail(data.email);
        })
        .catch((error) => {
          setIsLoading(false);
          navigate("/auth/register");
          console.log(error);
        });
    } else {
      navigate("/auth/login");
    }
  }, []);

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
            navigate("/favorite", { state: { token } });
          }}
          style={{
            width: "100px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
          }}
        >
          Favorites
        </button>

        <button
          onClick={handleMyAccountClick}
          style={{
            width: "100px",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "7px",
            backgroundColor: "#FFF261",
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
          <h2 style={{ color: "#333652", marginLeft: "45px" }}>
            Login and Security
          </h2>
          <div>
            <div>
              <div style={{ display: "flex", gap: 88, alignItems: "center" }}>
                <h4 style={{ color: "#333652" }}>Id</h4>
                <p>{_id}</p>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", gap: 65, alignItems: "center" }}>
                <h4>Name</h4>
                <p>{name}</p>

                <button
                  onClick={handleNameEditClick}
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "#333652",
                    color: "white",
                    padding: "2px 10px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: 64, alignItems: "center" }}>
              <h4>Email</h4>
              <p>{email}</p>
            </div>

            <div>
              <div style={{ display: "flex", gap: 39, alignItems: "center" }}>
                <h4>Password</h4>
                <p>**********</p>

                <button
                  onClick={handleChangePasswordClick}
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "#333652",
                    color: "white",
                    padding: "2px 10px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={handleDeactivateAccountClick}
                style={{
                  borderRadius: "4px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "2px 10px",
                  margin: "20px 60px",
                  cursor: "pointer",
                }}
              >
                Deactivate account!
              </button>

              {!!errors && errors?.includes("Try again") && (
                <>
                  <i>{String.fromCodePoint(0x26a0)}</i>
                  <p>{errors}</p>
                </>
              )}
            </div>
          </div>
        </div>
        {isLoading && <div></div>}
      </div>
    </div>
  );
}

export default Profile;
