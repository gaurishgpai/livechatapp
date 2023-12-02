import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./App.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import ChatWidget from "./ChatWidget";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        backgroundColor: "none",
        height: "100vh",
        width: "100%",
        zIndex: "10000",
      }}
    >
      {isOpen && <ChatWidget />}
      <div
        style={{
          position: "absolute",
          bottom: "25px",
          right: "30px",
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          backgroundColor: "#1972F5",
          alignItems: "center",
          display: "flex",
          cursor: "pointer",
          justifyContent: "center",
        }}
        onClick={toggleChat}
      >
        {isOpen ? (
          <AddCircleOutlineIcon
            style={{ color: "white", height: "30px", width: "30px" }}
          />
        ) : (
          <ChatBubbleIcon
            style={{
              color: "white",
              height: "30px",
              width: "30px",
              margin: "5px 0 0 0",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
