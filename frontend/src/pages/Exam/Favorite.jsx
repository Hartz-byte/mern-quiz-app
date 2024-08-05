import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

function Favorite() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = location?.state?.token;
  const headers = { Authorization: `Bearer ${token}` };

  const [flag, setFlag] = useState(false);
  const [favQues, setFavQues] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function handleRemoveFavouriteClick(id, e) {
    setIsLoading(true);
    axios
      .delete(`http://localhost:3002/favquestion/${id}`, { headers })
      .then(() => {
        setIsLoading(false);
        setFlag(!flag);
      })
      .catch(() => {
        setIsLoading(false);
        navigate("/auth/login");
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3002/favquestion", { headers })
      .then((response) => {
        setIsLoading(false);
        setFavQues(response?.data?.data?.favQues);
      })
      .catch((error) => {
        setIsLoading(false);
        navigate("/auth/login");
      });
  }, [flag]);

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
          style={{ position: "absolute", top: 260, right: 30, width: "250px" }}
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
            backgroundColor: "#FFF261",
          }}
        >
          Favorites
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

      {/* main container */}
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: "#e0e1dd",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#333652" }}>Quiz App</h2>

        <div>
          {!!favQues &&
            favQues.length !== 0 &&
            favQues.map((list, i) => {
              return (
                <div key={list.question}>
                  <div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <p>Question {i + 1}:</p>
                      <p>{list.question}</p>
                    </div>
                  </div>
                  {!!list.options && (
                    <div>
                      <p>Options:</p>
                      {Object.keys(list.options).map(function (key) {
                        return (
                          <div key={key} style={{ display: "flex", gap: 10 }}>
                            <p>{key}:</p>
                            <p>{list.options[key]}</p>
                          </div>
                        );
                      })}
                      <div>
                        <button
                          onClick={(e) =>
                            handleRemoveFavouriteClick(list._id, e)
                          }
                          style={{
                            marginBottom: "10px",
                            borderRadius: "4px",
                            backgroundColor: "#333652",
                            color: "white",
                            padding: "5px",
                            cursor: "pointer",
                            marginLeft: "100px",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          {!!favQues && favQues.length === 0 && (
            <div>
              <div>
                <h4 style={{ color: "#333652" }}>No question added!</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorite;
