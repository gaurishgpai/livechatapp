import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Button } from "@mui/material";
import AddWebsite from "./AddWebsite";
import { useRef } from "react";
const admin_id = localStorage.getItem("admin_id");

function Website() {
  const paragraphRef = useRef(null);
  const [websiteName, setWebsiteName] = useState();
  const [websiteD, setWebsiteD] = useState();
  const [employee, setEmployee] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/website/getwebsite?id=" + admin_id
        );
        setWebsiteName(response.data[0].name);
        setWebsiteD(response.data[0]._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchData2 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/getemployee?id=" + websiteD
      );
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData2();
  }, [websiteD]);

  const copyText = () => {
    if (paragraphRef.current) {
      const textToCopy = paragraphRef.current.innerText;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Text copied to clipboard:", textToCopy);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    }
  };

  return (
    <>
      {websiteName ? (
        <div style={{ height: "calc(100vh - 90px", backgroundColor: "white" }}>
          <p style={{ padding: "0 0 0 0", margin: "10px", fontSize: "20px" }}>
            Website Settings - {websiteName}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "100px",
                width: "calc(100% - 30px",
                backgroundColor: "skyblue",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <p ref={paragraphRef}>
                &lt;iframe style=" border: none; z-index: 10000; height: 100vh;
                width: 100vw; position: fixed; "
                src="http://localhost:3001/src/index.js?id={websiteD}"
                &gt;&lt;/iframe&gt;
              </p>
            </div>
          </div>
          <div
            style={{
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ margin: "0", padding: "0" }}>
              paste this link in your website
            </p>
            <Button
              style={{
                margin: "0",
                width: "130px",
                height: "20px",
              }}
              variant="contained"
            >
              copy link
            </Button>
          </div>
          <p style={{ margin: "10px" }}>Chat Agents settings</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {employee &&
              employee.map((emp) => (
                <Agent
                  key={emp._id}
                  name={emp.name}
                  email={emp.email}
                  phone={emp.phone}
                />
              ))}
          </div>
          <AddEmployee fetchData2={fetchData2} websiteD={websiteD} />
        </div>
      ) : (
        <AddWebsite setWebsiteName={setWebsiteName} />
      )}
      {/* <AddWebsite /> */}
    </>
  );
}

export default Website;

function Agent({ name, email, phone }) {
  return (
    <>
      <div
        style={{
          height: "50px",
          width: "calc(100% - 30px)",
          backgroundColor: "#FCE09B",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0 0 0",
        }}
      >
        <FiberManualRecordIcon
          style={{ color: "green", margin: "0 0 0 20px" }}
        />
        <p>{name}</p>
        <p>{email}</p>
        <p style={{ margin: "0 40px 0 0" }}>{phone}</p>
      </div>
    </>
  );
}

const AddEmployee = (props) => {
  const [num, setNum] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const url = "http://localhost:5000/admin/createemployee";
  function submitForm() {
    setNum(1);
    const data = {
      name: name,
      phone: phone,
      role: "employee",
      email: email,
      password: password,
      website_id: props.websiteD,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      .then(() => {
        props.fetchData2();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setEmail("");
    setPassword("");
    setPhone();
    setName("");
  }

  return (
    <>
      {num === 0 && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            zIndex: "1000",
            position: "absolute",
            top: "-20px",
            left: "-20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "420px",
              width: "400px",
              backgroundColor: "white",
              border: "2px solid black",
            }}
          >
            <div
              style={{
                height: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <CloseIcon
                onClick={() => setNum(1)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div
              style={{
                height: "calc(100% - 20px)",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                style={{ margin: "10px 5px 10px 5px", width: "300px" }}
                id="name"
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
              <TextField
                style={{ margin: "10px 5px 10px 5px", width: "300px" }}
                id="email"
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
              <TextField
                style={{ margin: "10px 5px 10px 5px", width: "300px" }}
                id="phone"
                label="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="outlined"
              />
              <TextField
                style={{ margin: "10px 5px 10px 5px", width: "300px" }}
                id="password"
                label="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
              <Button
                onClick={submitForm}
                style={{ margin: "10px 5px 10px 5px", width: "300px" }}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          height: "30px",
          width: "calc(100% - 30px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <Button
          onClick={() => setNum(0)}
          style={{ margin: "30px 5px 10px 5px", width: "150px" }}
          variant="contained"
        >
          Add employee
        </Button>
      </div>
    </>
  );
};
