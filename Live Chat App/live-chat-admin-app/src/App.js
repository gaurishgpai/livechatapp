import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Template from "./Template";
import Login from "./Login";
import Register from "./Register";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
function Main() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="admind" element={<AdminDashboard />} />
        <Route path="template" element={<Template />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
