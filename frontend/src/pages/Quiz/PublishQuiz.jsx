import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

function PublishQuiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = location?.state?.token;
  const headers = { Authorization: `Bearer ${token}` };

  const [flag, setFlag] = useState(true);
  const [quizId, setQuizId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [myQuizList, setMyQuizList] = useState([]);

  function handlePublishButtonClick(id, e) {
    e.preventDefault();
    setIsLoading(true);
    setQuizId(id);
  }

  useEffect(() => {
    if (!!quizId) {
      axios
        .patch("http://localhost:3002/quiz/publish", { quizId }, { headers })
        .then((response) => {
          setQuizId("");
          setFlag(!flag);
        })
        .catch((error) => {
          setQuizId("");
          setFlag(!flag);
          navigate("/auth/login");
        });
    }
    axios
      .get("http://localhost:3002/quiz", { headers })
      .then((response) => {
        setIsLoading(false);
        setMyQuizList(response?.data?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        const message = error?.response?.data?.message;
        if (message.includes("Quiz not found!")) {
          setMyQuizList(["No quiz found"]);
        }
      });
  }, [quizId, flag]);

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
          style={{ position: "absolute", top: 270, right: 30, width: "250px" }}
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
          marginTop: "150px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Publish Quiz</h2>

          <div style={{ marginTop: 15, marginBottom: 15 }}>
            {!!myQuizList &&
              myQuizList.length != 0 &&
              myQuizList.map((list) => {
                return (
                  <div key={list._id}>
                    <div style={{ display: "flex", gap: 200 }}>
                      <div>
                        <h4>{list.name}</h4>
                      </div>
                      {list?.isPublished ? (
                        <button
                          disabled
                          style={{
                            marginBottom: "10px",
                            borderRadius: "4px",
                            backgroundColor: "#333652",
                            color: "white",
                            padding: "5px",
                          }}
                        >
                          Published
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handlePublishButtonClick(list._id, e)}
                          style={{
                            marginBottom: "10px",
                            borderRadius: "4px",
                            backgroundColor: "#333652",
                            color: "white",
                            padding: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Publish
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            {!!myQuizList && myQuizList.length === 0 && (
              <div>
                <div>
                  <div>
                    <h4>No quiz found!</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublishQuiz;
