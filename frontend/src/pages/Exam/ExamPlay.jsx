import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

function ExamPlay() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState();
  const [flag, setFlag] = useState(false);
  const [quizId, setQuizId] = useState(params?.id);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(["testing"]);
  const [favQues, setFavQues] = useState();
  const [attemptedQuestion, setAttemptedQuestion] = useState({});

  const token = location?.state?.token;
  const headers = { Authorization: `Bearer ${token}` };

  function handleOptionChangeClick(questionNumber, key) {
    setAttemptedQuestion((oldObject) => {
      return { ...oldObject, [questionNumber]: key };
    });
  }

  function handleClearButtonClick(questionNumber, e) {
    e.preventDefault();
    setAttemptedQuestion((oldObject) => {
      let object = {};
      for (let i in oldObject) {
        if (i == questionNumber) {
          object = { ...object };
        } else {
          object = { ...object, [i]: oldObject[i] };
        }
      }
      return object;
    });
  }

  function handleSubmitClick(evt) {
    evt.preventDefault();
    setErrors([]);
    setIsLoading(true);
    if (quiz.questionList.length !== Object.keys(attemptedQuestion).length) {
      setErrors(["Attempt all the questions"]);
    }
  }

  function handleToggleFavouriteClick(questionList, e) {
    e.preventDefault();
    setIsLoading(true);
    if (!!favQues && favQues.length !== 0) {
      let id = "";
      const result = favQues.some((list) => {
        id = list._id;
        return list.question === questionList.question;
      });
      if (!result) {
        axios
          .post(
            "http://localhost:3002/favquestion",
            { question: questionList.question, options: questionList.options },
            { headers }
          )
          .then(() => {
            setIsLoading(false);
            setFlag(!flag);
          })
          .catch(() => {
            setIsLoading(false);
            navigate("/registerlogin");
          });
      } else {
        axios
          .delete(`http://localhost:3002/favquestion/${id}`, { headers })
          .then(() => {
            setIsLoading(false);
            setFlag(!flag);
          })
          .catch(() => {
            setIsLoading(false);
            navigate("/registerlogin");
          });
      }
    } else {
      axios
        .post(
          "http://localhost:3002/favquestion",
          { question: questionList.question, options: questionList.options },
          { headers }
        )
        .then(() => {
          setIsLoading(false);
          setFlag(!flag);
        })
        .catch(() => {
          setIsLoading(false);
          navigate("/registerlogin");
        });
    }
  }

  useEffect(() => {
    if (!!errors && errors.length === 0) {
      axios
        .post(
          "http://localhost:3002/exam",
          { quizId: params?.id, attemptedQuestion },
          { headers }
        )
        .then((response) => {
          setIsLoading(false);
          navigate(`/report/${response?.data?.data?.reportId}`, {
            state: { token },
          });
        })
        .catch((error) => {
          setIsLoading(false);
          navigate("/registerlogin");
        });
    } else {
      setIsLoading(false);
    }
    if (!!quizId) {
      axios
        .get(`http://localhost:3002/exam/${quizId}`, { headers })
        .then((response) => {
          setIsLoading(false);
          setQuizId("");
          setQuiz(response?.data?.data);
        })
        .catch((error) => {
          setIsLoading(false);
          setQuizId("");
          const message = error?.response?.data?.message;
          if (message.includes("You have zero attempts left!")) {
            navigate("/publish-quiz", {
              state: { token, message: true },
            });
          } else {
            navigate("/registerlogin");
          }
        });
    }

    axios
      .get("http://localhost:3002/favquestion", { headers })
      .then((response) => {
        setIsLoading(false);
        setFavQues(response?.data?.data?.favQues);
      })
      .catch(() => {
        setIsLoading(false);
        navigate("/registerlogin");
      });
  }, [quizId, errors, flag]);

  useEffect(() => {
    if (!!quizId) {
      axios
        .get(`http://localhost:3002/exam/${quizId}`, { headers })
        .then((response) => {
          setIsLoading(false);
          setQuizId("");
          setQuiz(response?.data?.data);
        })
        .catch((error) => {
          setIsLoading(false);
          setQuizId("");
          const message = error?.response?.data?.message;
          if (message.includes("You have zero attempts left!")) {
            navigate("/publish-quiz", {
              state: { token, message: true },
            });
          } else {
            navigate("/registerlogin");
          }
        });
    }
  }, [quizId]);

  if (!token) {
    return <Navigate to="/registerlogin" />;
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
          Exit
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
        <div>
          <h2 style={{ color: "#333652" }}>Quiz Time</h2>
        </div>
        <div>
          <h2 style={{ color: "#333652" }}>{quiz?.name}</h2>

          {/* border */}
          <div
            style={{
              width: "671px",
              height: "1px",
              backgroundColor: "white",
              position: "absolute",
              left: "27.9%",
              marginTop: "10px",
            }}
          />

          {!!quiz &&
            quiz?.questionList.map((list) => {
              return (
                <div key={list.questionNumber}>
                  <div>
                    <div>
                      <div>
                        <h4 style={{ color: "red", marginTop: "50px" }}>
                          Question {list.questionNumber}:
                        </h4>
                        <p>{list.question}</p>
                      </div>
                      <div>
                        <button
                          onClick={(e) => handleToggleFavouriteClick(list, e)}
                          style={{
                            marginBottom: "10px",
                            borderRadius: "4px",
                            backgroundColor: "#333652",
                            color: "white",
                            padding: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Favorite
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4>Options</h4>
                      {!!list.options &&
                        Object.keys(list.options).map(function (key) {
                          return (
                            <div key={key} style={{ display: "flex" }}>
                              <input
                                type="radio"
                                name={"question" + list.questionNumber}
                                onChange={(e) =>
                                  handleOptionChangeClick(
                                    list.questionNumber,
                                    key
                                  )
                                }
                                value={key}
                                checked={
                                  !!attemptedQuestion &&
                                  Object.keys(attemptedQuestion).some(
                                    (index) => {
                                      if (
                                        index == list.questionNumber &&
                                        attemptedQuestion[index] == key
                                      ) {
                                        return true;
                                      }
                                      return false;
                                    }
                                  )
                                }
                              />
                              <p>{key}:</p>
                              <p>{list.options[key]}</p>
                            </div>
                          );
                        })}
                      <button
                        onClick={(e) =>
                          handleClearButtonClick(list.questionNumber, e)
                        }
                        style={{
                          marginBottom: "10px",
                          borderRadius: "4px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Clear choice
                      </button>

                      {/* border */}
                      <div
                        style={{
                          width: "671px",
                          height: "1px",
                          backgroundColor: "white",
                          position: "absolute",
                          left: "27.9%",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          {!!errors && errors.length > 0 && !errors.includes("testing") && (
            <div>
              <ul>
                {errors.map((message) => {
                  return <li key={message}>{message}</li>;
                })}
              </ul>
            </div>
          )}

          {/* border */}
          <div
            style={{
              width: "671px",
              height: "1px",
              backgroundColor: "white",
              position: "absolute",
              left: "27.9%",
              marginTop: "10px",
            }}
          />

          <button
            onClick={(e) => handleSubmitClick(e)}
            style={{
              marginBottom: "10px",
              borderRadius: "4px",
              backgroundColor: "red",
              color: "white",
              padding: "5px",
              cursor: "pointer",
              marginLeft: "150px",
              marginTop: "40px",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamPlay;
