import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
const AdminDashboard = () => {
  const [admin, setAdmin] = useState("");
  async function submitForm() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/delete/${admin}`
      );
      setAdmin("");
      console.log("Admin deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  }
  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <TextField
          style={{ margin: "10px 5px 10px 5px", width: "300px" }}
          id="admin_id"
          label="admin_id"
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
          variant="outlined"
        />
        <Button
          onClick={submitForm}
          style={{ margin: "10px 5px 10px 5px", width: "300px" }}
          variant="contained"
        >
          Delete admin
        </Button>
      </div>
    </>
  );
};

export default AdminDashboard;
