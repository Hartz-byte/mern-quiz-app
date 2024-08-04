import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

function ChangeName() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = location?.state?.token;
  const headers = { Authorization: `Bearer ${token}` };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleLogoutClick(evt) {
    setIsLoading(true);

    navigate("/");
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleNameSubmitClick(evt) {
    evt.preventDefault();
    setErrors([]);
    setIsLoading(true);
    if (!name) {
      setErrors((oldArray) => [...oldArray, "Please enter name"]);
    }
  }

  function handleChangePasswordClick(evt) {
    navigate("/change-password", { state: { token } });
  }

  useEffect(() => {
    if (!!token) {
      axios
        .get("http://localhost:3002/user", { headers })
        .then((response) => {
          setIsLoading(false);
          const data = response.data.data;
          setEmail(data.email);
        })
        .catch((error) => {
          setIsLoading(false);
          navigate("/auth/register");
        });
    } else {
      navigate("/auth/login");
    }
    if (!!errors && errors.length === 0 && name.length >= 1) {
      axios
        .put("http://localhost:3002/user", { name }, { headers })
        .then((response) => {
          setIsLoading(false);
          navigate("/profile", { state: { token } });
        })
        .catch((error) => {
          setIsLoading(false);
          navigate("/auth/login");
        });
    }
  }, [errors]);

  if (!token) {
    return <Navigate to="/auth/login" />;
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
          <h2 style={{ color: "#333652" }}>Login and Security</h2>
          <div>
            <div>
              <div>
                <h4>Edit Name</h4>
                <input
                  type="text"
                  placeholder="Enter new name"
                  value={name}
                  onChange={handleNameChange}
                  style={{
                    width: "200px",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <button
                onClick={handleNameSubmitClick}
                style={{
                  borderRadius: "4px",
                  backgroundColor: "#333652",
                  color: "white",
                  padding: "2px 10px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
            <div></div>
            <div>
              <h4>Email</h4>
              <p>{email}</p>
            </div>
            <div></div>
            <div>
              <div>
                <h4>Password</h4>
                <p>**********</p>
              </div>
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
            <div></div>
            <div>
              {!!errors && errors?.includes("Try again") && (
                <>
                  <i>{String.fromCodePoint(0x26a0)}</i>
                  <p>{errors}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeName;
