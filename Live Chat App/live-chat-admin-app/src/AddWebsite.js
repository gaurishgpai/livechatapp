import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const url = "http://localhost:5000/website/add/";

const AddWebsite = (props) => {
  const navigate = useNavigate();
  const [website, setWebsite] = useState("");

  function submitForm() {
    const data = {
      name: website,
      admin_id: localStorage.getItem("admin_id"),
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
        props.setWebsiteName(responseData.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <div
        style={{
          height: "calc(100vh - 90px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "280px",
            width: "320px",
            border: "2px solid green",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            style={{ margin: "10px 5px 10px 5px", width: "300px" }}
            id="website"
            label="Domain Name"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            variant="outlined"
          />
          <Button
            onClick={submitForm}
            style={{ margin: "10px 5px 10px 5px", width: "300px" }}
            variant="contained"
          >
            Add Website
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddWebsite;
