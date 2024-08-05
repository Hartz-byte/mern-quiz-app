import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

function QuizList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [quizId, setQuizId] = useState();
  const [quizExam, setQuizExam] = useState([]);
  const [quizTest, setQuizTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAttempt, setIsAttempt] = useState(false);
  const [isMessage, setIsAMessage] = useState(location?.state?.message);

  const token = location?.state?.token;
  const headers = { Authorization: `Bearer ${token}` };

  function handleAttemptClick(evt) {
    evt.preventDefault();
    navigate(`/examplay/${quizId}`, { state: { token } });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3002/quiz/allpublishedquiz/exam", { headers })
      .then((response) => {
        setIsLoading(false);
        setQuizExam(response?.data?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        navigate("/");
      });
    axios
      .get("http://localhost:3002/quiz/allpublishedquiz/test", { headers })
      .then((response) => {
        setIsLoading(false);
        setQuizTest(response?.data?.data);
      })
      .catch(() => {
        setIsLoading(false);
        navigate("/");
      });
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
            backgroundColor: "#FFF261",
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
          marginTop: "80px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "#333652" }}>Quiz List</h2>

            <h2 style={{ color: "#333652" }}>Exam</h2>

            {!!quizExam &&
              quizExam.length !== 0 &&
              quizExam.map((list) => {
                return (
                  <div key={list._id}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 80 }}
                    >
                      <div>
                        <h4>{list.name}</h4>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setIsAttempt(true);
                            setQuizId(list._id);
                          }}
                          style={{
                            marginBottom: "10px",
                            borderRadius: "4px",
                            backgroundColor: "#333652",
                            color: "white",
                            padding: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Attempt
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            {!!quizExam && quizExam.length === 0 && (
              <div>
                <div>
                  <div>
                    <h4 style={{ color: "#333652" }}>No quiz found!</h4>
                  </div>
                </div>
              </div>
            )}

            <h2 style={{ color: "#333652" }}>Test</h2>
            {!!quizTest &&
              quizTest.length !== 0 &&
              quizTest.map((list) => {
                return (
                  <div key={list._id}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 80 }}
                    >
                      <div>
                        <h4>{list.name}</h4>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setIsAttempt(true);
                            setQuizId(list._id);
                          }}
                          style={{
                            marginBottom: "10px",
                            borderRadius: "4px",
                            backgroundColor: "#333652",
                            color: "white",
                            padding: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Attempt
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            {!!quizTest && quizTest.length === 0 && (
              <div>
                <div>
                  <div>
                    <h4 style={{ color: "#333652" }}>No quiz found!</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isAttempt && (
            <div
              style={{
                position: "absolute",
                width: "200px",
                height: "150px",
                backgroundColor: "gray",
                borderRadius: "7px",
                top: "40%",
                left: "45%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label style={{ marginTop: "40px" }}>Are you sure?</label>
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={(e) => handleAttemptClick(e)}
                    style={{
                      marginBottom: "10px",
                      borderRadius: "4px",
                      backgroundColor: "#333652",
                      color: "white",
                      padding: "5px",
                    }}
                  >
                    Attempt
                  </button>
                  <button
                    onClick={(e) => setIsAttempt(false)}
                    style={{
                      marginBottom: "10px",
                      borderRadius: "4px",
                      backgroundColor: "#333652",
                      color: "white",
                      padding: "5px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {!!isMessage && (
            <div>
              <div>
                <label style={{ color: "#333652" }}>
                  You have zero attempts left!
                </label>
                <div>
                  <button
                    onClick={(e) => setIsAMessage(false)}
                    style={{
                      marginBottom: "10px",
                      borderRadius: "4px",
                      backgroundColor: "#333652",
                      color: "white",
                      padding: "5px",
                    }}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizList;
