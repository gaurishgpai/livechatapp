import SendIcon from "@mui/icons-material/Send";
import { createNextState } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", { transports: ["websocket"] });
const visitor_id = localStorage.getItem("visitor_id");
const url = "http://localhost:5000/message/get?id=" + visitor_id;
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  socket.on(visitor_id, (message) => {
    setMessages([{ sender: "admin", message: message.message }, ...messages]);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setMessages(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sendMessage = () => {
    let socketMessage = {
      admin: "ramraj",
      visitor_id: localStorage.getItem("visitor_id"),
      admin_id: localStorage.getItem("admin_id"),
      message: message,
    };
    socket.emit("admin", socketMessage);
    setMessages([{ sender: "visitor", message: message }, ...messages]);

    setMessage("");
  };

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <div
          className="styled-scrollbars"
          style={{
            height: "calc(100% - 100px)",
            width: "100%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {messages.map((message) => {
            if (message.sender === "admin") {
              return <AdminMessage key={message._id} message={message} />;
            } else {
              return <VisitorMessage key={message._id} message={message} />;
            }
          })}
        </div>
        <div
          style={{
            height: "50px",
            width: "100%",
            backgroundColor: "#1972F5",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            onChange={(e) => setMessage(e.target.value)}
            style={{
              outline: "none",
              height: "30px",
              border: "none",
              backgroundColor: "skyblue",
              margin: "0 0 0 5px",
              width: "calc(100% - 60px)",
              borderRadius: "8px",
              padding: "0 0 0 10px",
            }}
            value={message}
            placeholder="Type a Message"
          />
          <SendIcon
            onClick={sendMessage}
            style={{ color: "grey", margin: "0 10px 0 0" }}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;

const VisitorMessage = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          padding: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "skyblue",
            display: "inline-block",
            width: "fit-content",
            maxWidth: "300px",
            alignItems: "center",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              textAlign: "left",
              padding: "0",
              margin: "5px 5px 5px 5px",
            }}
          >
            {props.message.message}
          </p>
        </div>
      </div>
    </>
  );
};

const AdminMessage = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          padding: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "skyblue",
            display: "inline-block",
            width: "fit-content",
            maxWidth: "300px",
            alignItems: "center",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              textAlign: "right",
              padding: "0",
              margin: "5px 5px 5px 5px",
            }}
          >
            {props.message.message}
          </p>
        </div>
      </div>
    </>
  );
};
