import "./App.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const url = "http://localhost:5000/admin/login/";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function submitForm() {
    const data = {
      email: email,
      password: password,
    };
    const requestOptions = {
      method: "POST",
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
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("role", responseData.role);
        localStorage.setItem("email", responseData.email);
        localStorage.setItem("admin_id", responseData.admin_id);
        if (responseData.role === "superadmin") {
          navigate("/admind");
        }
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p className="companyName">Crunch</p>
        <div className="loginTable">
          <p>Login to Crunch</p>
          <TextField
            style={{ margin: "10px 5px 10px 5px", width: "300px" }}
            id="username"
            label="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            style={{ margin: "10px 5px 10px 5px", width: "300px" }}
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={submitForm}
            style={{ margin: "10px 5px 10px 5px", width: "300px" }}
            variant="contained"
          >
            Login
          </Button>
        </div>
        <p style={{ textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </>
  );
}

export default AdminLogin;
