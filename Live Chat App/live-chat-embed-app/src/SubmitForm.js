import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { updateVId } from "./visitorSlice";
const url = "http://localhost:5000/visitor/registration";

const SubmitForm = () => {
  const website_id = new URLSearchParams(window.location.search).get("id");
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();

  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Firefox")) {
      return "Mozilla Firefox";
    } else if (userAgent.includes("Chrome")) {
      return "Google Chrome";
    } else if (userAgent.includes("Safari")) {
      return "Apple Safari";
    } else if (userAgent.includes("Edge")) {
      return "Microsoft Edge";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
      return "Internet Explorer";
    } else {
      return "Other";
    }
  };

  const userBrowser = getBrowserInfo();

  function submitForm() {
    const data = {
      name: name,
      email: email,
      phone: phone,
      website_id: website_id,
      platform: userBrowser,
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
        localStorage.setItem("visitor_id", responseData.visitor_id);
        localStorage.setItem("admin_id", responseData.admin_id);
        dispatch(updateVId(responseData.visitor_id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <div
        style={{
          height: "calc(100% - 50px)",
          width: "100%",
          backgroundColor: "white",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          style={{ margin: "10px 5px 10px 5px", width: "300px" }}
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
        <TextField
          style={{ margin: "10px 5px 10px 5px", width: "300px" }}
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          style={{ margin: "10px 5px 10px 5px", width: "300px" }}
          id="phone"
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          variant="outlined"
        />
        <Button
          onClick={submitForm}
          style={{ margin: "10px 5px 10px 5px", width: "300px" }}
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </>
  );
};
export default SubmitForm;
