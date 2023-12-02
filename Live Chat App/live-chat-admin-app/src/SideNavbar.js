import BarChartIcon from "@mui/icons-material/BarChart";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import ChatIcon from "@mui/icons-material/Chat";
import { chat, dashboard, website } from "./counterSlice";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function SideNavbar() {
  const dispatch = useDispatch();
  const { num } = useSelector((store) => store.count);
  return (
    <>
      <div style={{ height: "calc(100vh - 90px)", backgroundColor: "#B2533E" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "100%",
          }}
        >
          {localStorage.getItem("role") === "admin" && (
            <div>
              <div>
                <button
                  className="contentButton"
                  onClick={() => dispatch(dashboard())}
                >
                  <BarChartIcon className={num === 0 && "contentIcon"} />
                  <p style={{ color: num === 0 ? "white" : "black" }}>
                    Dashboard
                  </p>
                </button>
              </div>
              <div>
                <button
                  className="contentButton"
                  onClick={() => dispatch(website())}
                >
                  <WebAssetIcon className={num === 1 && "contentIcon"} />
                  <p style={{ color: num === 1 ? "white" : "black" }}>
                    Website
                  </p>
                </button>
              </div>
            </div>
          )}
          <div>
            <button className="contentButton" onClick={() => dispatch(chat())}>
              <ChatIcon className={num === 2 && "contentIcon"} />
              <p style={{ color: num === 2 ? "white" : "black" }}>Chats</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNavbar;
