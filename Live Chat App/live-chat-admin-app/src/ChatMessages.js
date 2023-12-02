import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

function ChatMessages() {
  const { visitorId } = useSelector((store) => store.visitor);
  const [messagesMap, setMessagesMap] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/message/get?id=" + visitorId
        );
        setMessagesMap((prevMessagesMap) => ({
          ...prevMessagesMap,
          [visitorId]: response.data.reverse(),
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [visitorId]);
  const updateMessagesForVisitor = (visitorId, newMessage) => {
    setMessagesMap((prevMessagesMap) => ({
      ...prevMessagesMap,
      [visitorId]: [newMessage, ...(prevMessagesMap[visitorId] || [])],
    }));
  };

  useEffect(() => {
    const event = visitorId + "1";
    socket.once(event, (message) => {
      if (message.visitor_id === visitorId) {
        updateMessagesForVisitor(visitorId, {
          sender: "visitor",
          message: message.message,
        });
      }
    });

    return () => {
      socket.off(event);
    };
  }, [visitorId]);

  const sendMessage = () => {
    let socketMessage = {
      admin: "ramraj",
      visitor_id: visitorId,
      admin_id: localStorage.getItem("admin_id"),
      message: message,
    };
    socket.emit("visitor", socketMessage);
    updateMessagesForVisitor(visitorId, {
      sender: "admin",
      message: message,
    });
    setMessage("");
  };
  const currentMessages = messagesMap[visitorId] || [];
  return (
    <>
      <div
        className="styled-scrollbars"
        style={{
          overflowY: "auto",
          height: "calc(100vh - 130px)",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {currentMessages.map((message, index) => (
          <div key={index}>
            {message.sender === "visitor" ? (
              <AdminMessage message={message} />
            ) : (
              <VisitorMessage message={message} />
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "40px",
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
        >
          Send
        </SendIcon>
      </div>
    </>
  );
}

export default ChatMessages;

const VisitorMessage = ({ message }) => {
  return (
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
          {message.message}
        </p>
      </div>
    </div>
  );
};

const AdminMessage = ({ message }) => {
  return (
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
            textAlign: "left",
            padding: "0",
            margin: "5px 5px 5px 5px",
          }}
        >
          {message.message}
        </p>
      </div>
    </div>
  );
};
