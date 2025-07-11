import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  IconButton,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Facebook, Google, LinkedIn, Edit, Delete } from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, mobileNumber, password, role } = formData;

    if (!username || !email || !mobileNumber || !password || !role) {
      setError("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Mobile number must be 10 digits");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (!isEditing) {
      setUsers([...users, formData]);
    } else {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setIsEditing(false);
      setEditIndex(null);
    }

    setFormData({
      username: "",
      email: "",
      mobileNumber: "",
      password: "",
      role: "",
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
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, mt: 4 }}>
      {/* Form */}
      <Paper
        elevation={3}
        sx={{
          width: "600px",
          p: 4,
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          {isEditing ? "Update User" : "Register"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Username"
            name="username"
            fullWidth
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            type="number"
            fullWidth
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>

          {error && <Typography color="error">{error}</Typography>}

          <Button type="submit" variant="contained" color="primary">
            {isEditing ? "Update" : "Register"}
          </Button>
        </Box>
      </Paper>

      {/* Table */}
      {users.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            width: "80%",
            p: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Registered Users
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                   <TableCell>S.No</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                     <TableCell>{index + 1}</TableCell> 
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobileNumber}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleEdit(index)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default Login;
