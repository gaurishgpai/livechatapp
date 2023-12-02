import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateVId } from "./visitorSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", { transports: ["websocket"] });
const admin_id = localStorage.getItem("admin_id");
const url = "http://localhost:5000/message/getvisitorname?id=" + admin_id;
function VisitorNames() {
  const [visitors, setVisitors] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setVisitors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reloadFlag]);

  socket.once(admin_id, (message) => {
    setReloadFlag(Math.random);
  });

  return (
    <>
      <div
        className="styled-scrollbars"
        style={{
          overflowY: "auto",
          height: "calc(100vh - 90px)",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid grey",
        }}
      >
        {visitors.map((visitor) => {
          return (
            <VisitorNameSlice
              key={visitor.lastMessage["visitor_id"]}
              message={visitor.lastMessage["message"]}
              name={visitor.lastMessage["visitor"].name}
              sender={visitor.lastMessage["sender"]}
              visitor_id={visitor.lastMessage["visitor_id"]}
            />
          );
        })}
      </div>
    </>
  );
}

export default VisitorNames;

function VisitorNameSlice(props) {
  const dispatch = useDispatch();
  const updateVisitorId = () => {
    dispatch(updateVId(props.visitor_id));
    console.log(props.visitor_id);
  };
  return (
    <>
      <div
        onClick={updateVisitorId}
        style={{
          height: "70px",
          width: "100%",
          backgroundColor: "#fff",
          display: "grid",
          gridTemplateColumns: "2fr 9fr 1fr",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              backgroundColor: "grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PersonIcon style={{ height: "30px" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",

            borderBottom: ".5px solid black",
          }}
        >
          <p style={{ fontSize: "18px", padding: "0", margin: "0" }}>
            {props.name}
          </p>

          {props.sender === "admin" ? (
            <p style={{ fontSize: "12px", padding: "0", margin: "0" }}>
              You: {props.message}
            </p>
          ) : (
            <p style={{ fontSize: "12px", padding: "0", margin: "0" }}>
              {props.message}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "20px",
              width: "20px",
              backgroundColor: "green",
              borderRadius: "50%",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                padding: "0",
                margin: "0",
                lineHeight: "20px",
                textAlign: "center",
              }}
            >
              2
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
