import ChatMessages from "./ChatMessages";
import VisitorNames from "./VisitorNames";
import VisitorDetails from "./VisitorDetails";
import Background from "./Background";
import { useSelector } from "react-redux";
function Chat() {
  const { visitorId } = useSelector((state) => state.visitor);
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "2.5fr 6fr 2.5fr" }}>
        <div style={{ height: "calc(100vh - 90px)" }}>
          <VisitorNames />
        </div>
        {visitorId ? (
          <>
            <div style={{ height: "calc(100vh - 90px)" }}>
              <ChatMessages />
            </div>
            <div
              style={{ height: "calc(100vh - 90px)", backgroundColor: "white" }}
            >
              <VisitorDetails />
            </div>
          </>
        ) : (
          <Background />
        )}
      </div>
    </>
  );
}

export default Chat;
