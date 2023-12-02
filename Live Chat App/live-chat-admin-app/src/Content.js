import Chat from "./Chat";
import Dashboard from "./Dashboard";
import Website from "./Website";
import { useSelector } from "react-redux";

function Content() {
  let { num } = useSelector((store) => store.count);
  if (localStorage.getItem("role") == "employee") {
    num = 2;
  }
  return (
    <>
      {num === 0 && <Dashboard />}
      {num === 1 && <Website />}
      {num === 2 && <Chat />}
    </>
  );
}
export default Content;
