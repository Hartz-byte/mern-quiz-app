import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Pic1 from "../../assets/1.png";
import Pic2 from "../../assets/2.png";

function Reports() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const reportId = params?.reportId;
  const token = location?.state?.token;
  const headers = { Authorization: `Bearer ${token}` };

  const [report, setReport] = useState();
  const [quizId, setQuizId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/report/${reportId}`, { headers })
      .then((response) => {
        setIsLoading(false);
        setReport(response?.data?.data);
        setQuizId(response?.data?.data?.quizId);
      })
      .catch((error) => {
        setIsLoading(false);
        navigate("/auth/login");
      });
  }, [quizId]);

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
          width: "30%",
          height: "100%",
          backgroundColor: "#e0e1dd",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "180px",
        }}
      >
        <div>
          <h2 style={{ color: "#333652" }}>Quiz App</h2>

          <div>
            <h2 style={{ color: "#333652" }}>Report</h2>
            {!!report && (
              <div style={{ marginBottom: "20px" }}>
                <div>
                  <div>
                    <label>Status: </label>
                    <label style={{ fontWeight: "bold" }}>
                      {report.result}
                    </label>
                  </div>
                  <div>
                    <label>Marks: </label>
                    <label>
                      {report.score}/{report.total}
                    </label>
                  </div>
                  <div>
                    <label>Percentage: </label>
                    <label>{report.percentage}%</label>
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

export default Reports;
