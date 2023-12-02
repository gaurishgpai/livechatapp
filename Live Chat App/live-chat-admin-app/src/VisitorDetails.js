import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const VisitorDetails = () => {
  const { visitorId } = useSelector((store) => store.visitor);
  const [visitorD, setVisitorD] = useState({});

  function updateResolvedStatus() {
    const url = "http://localhost:5000/visitor/updatestatus/" + visitorId;
    const data = {
      status: "resolved",
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.error(`Failed to post data. Status code: ${response.status}`);
          return response.text();
        }
      })
      .then((responseData) => {
        setVisitorD(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/visitor/getvisitor?id=" + visitorId
        );
        setVisitorD(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [visitorId]);
  return (
    <>
      <div
        style={{
          height: "calc(100vh - 90px)",
          backgroundColor: "white",
          borderLeft: "1px solid grey",
        }}
      >
        <div
          style={{
            height: "300px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "250px",
              width: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "skyblue",
            }}
          >
            <PersonIcon style={{ fontSize: "200px" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "17px", margin: "5px" }}>{visitorD.name}</p>
          <p style={{ fontSize: "17px", margin: "5px" }}>{visitorD.phone}</p>
          <p style={{ fontSize: "17px", margin: "5px" }}>{visitorD.email}</p>
        </div>
        <div
          style={{
            height: "200px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {visitorD.status === "notresolved" ? (
            <Button onClick={updateResolvedStatus} variant="contained">
              Resolved
            </Button>
          ) : (
            <p>Resolved</p>
          )}
        </div>
      </div>
    </>
  );
};

export default VisitorDetails;
