import "./App.css";
import SubmitForm from "./SubmitForm";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateVId } from "./visitorSlice";

import Chat from "./Chat";
const ChatWidget = () => {
  const { visitorId } = useSelector((store) => store.visitor);
  const dispatch = useDispatch();
  dispatch(updateVId(localStorage.getItem("visitor_id")));
  return (
    <>
      <div
        style={{
          height: "500px",
          width: "350px",
          backgroundColor: "white",
          position: "absolute",
          bottom: "95px",
          right: "30px",
          borderRadius: "12px",
        }}
        className="chat-widget-size"
      >
        <div
          style={{
            height: "50px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            backgroundColor: "#1972F5",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              padding: "0",
              margin: "0",
              textAlign: "center",
              lineHeight: "50px",
              fontWeight: "bold",
            }}
          >
            Chat
          </p>
        </div>
        {visitorId ? <Chat /> : <SubmitForm />}
      </div>
    </>
  );
};

export default ChatWidget;
