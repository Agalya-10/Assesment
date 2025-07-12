import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, Box,  IconButton,  MenuItem,  Select,  FormControl,InputLabel,Table,TableBody, TableCell, TableContainer,  TableHead,TableRow,} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({
    City: "",
    Country: "",
    Date: "",
    Weather: "",
    Description: "",
  });

  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem("weatherUsers");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { City, Country, Date, Weather, Description } = formData;

    if (!City || !Country || !Date || !Weather || !Description) {
      setError("Please fill all fields");
      return;
    }

    if (!isEditing) {
      const newUsers = [...users, formData];
      setUsers(newUsers);
      localStorage.setItem("weatherUsers", JSON.stringify(newUsers));
    } else {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      localStorage.setItem("weatherUsers", JSON.stringify(updatedUsers));
      setIsEditing(false);
      setEditIndex(null);
    }

    setFormData({
      City: "",
      Country: "",
      Date: "",
      Weather: "",
      Description: "",
    });
    setError("");
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("weatherUsers", JSON.stringify(updatedUsers));
  };

  return (
    <Box sx={{py: 4,width: "100%",display: "flex",px: { xs: 5, sm: 0 }, flexDirection: "column",alignItems: "center",}}>
      <Paper elevation={3}sx={{width: "100%",maxWidth: 600,p: { xs: 2, sm: 3 },borderRadius: 2,}}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select name="City" value={formData.City} onChange={handleChange} label="City">
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Salem">Salem</MenuItem>
              <MenuItem value="Kerala">Kerala</MenuItem>
              <MenuItem value="Madurai">Madurai</MenuItem>
              <MenuItem value="Thanjavur">Thanjavur</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select name="Country" value={formData.Country} onChange={handleChange} label="Country">
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Date"name="Date" type="date"fullWidth InputLabelProps={{ shrink: true }}value={formData.Date}onChange={handleChange}/>
          <FormControl fullWidth>
            <InputLabel>Weather</InputLabel>
            <Select name="Weather" value={formData.Weather} onChange={handleChange} label="Weather">
              <MenuItem value="Sunny">Sunny</MenuItem>
              <MenuItem value="Cloudy">Cloudy</MenuItem>
              <MenuItem value="Rainy">Rainy</MenuItem>
              <MenuItem value="Windy">Windy</MenuItem>
              <MenuItem value="Stormy">Stormy</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Description"name="Description"fullWidth autoComplete="off"value={formData.Description}onChange={handleChange}/>
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>{isEditing ? "Update" : "Register"}</Button>
        </Box>
      </Paper>
      {users.length > 0 && (
        <>
          <Typography variant="h6" mt={4} mb={1}>Registered Weather Reports</Typography>

          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Paper elevation={3} sx={{ minWidth: 700, maxWidth: "1000px",p:2, mx: "auto", mb: 6,}}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>S.No</strong></TableCell>
                      <TableCell><strong>City</strong></TableCell>
                      <TableCell><strong>Country</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Weather</strong></TableCell>
                      <TableCell><strong>Description</strong></TableCell>
                      <TableCell align="center"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.City}</TableCell>
                        <TableCell>{user.Country}</TableCell>
                        <TableCell>{user.Date}</TableCell>
                        <TableCell>{user.Weather}</TableCell>
                        <TableCell>{user.Description}</TableCell>
                        <TableCell align="center">
                          <IconButton color="success" onClick={() => handleEdit(index)}><Edit /></IconButton>
                          <IconButton color="error" onClick={() => handleDelete(index)}><Delete /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Login;
