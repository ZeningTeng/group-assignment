import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      setStatus("loading");
      try {
        const response = await axios.get(apiUrl + "/user/getAll");
        setUsers(response.data.users);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
        setError(error.response?.data?.message || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        const payload = { email: userToDelete.email };

        await axios.delete(apiUrl + "/user/delete", { data: payload });

        setUsers(users.filter((user) => user._id !== userToDelete._id));

        setSnackbarMessage("User deleted successfully!");
        setOpenSnackbar(true);

        setOpenDialog(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!users.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>No users found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom className="mb-4 text-center">
        Admin Dashboard - User List
      </Typography>

      <div className="container">
        <TableContainer component={Paper} className="mb-5">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="fw-bold">
                  Name
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Email
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Role
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="center">{user.fullName || "N/A"}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.role || "N/A"}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Admin;
