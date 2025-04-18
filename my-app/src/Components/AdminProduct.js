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

function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("loading");
      try {
        const response = await axios.get(apiUrl + "/product/getAll");
        setProducts(response.data.products);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
        setError(error.response?.data?.message || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        const payload = { id: productToDelete._id };
        console.log(payload.id);

        await axios.delete(apiUrl + "/product/delete/" + payload.id);

        setProducts(
          products.filter((product) => product._id !== productToDelete._id)
        );

        setSnackbarMessage("Product deleted successfully!");
        setOpenSnackbar(true);

        setOpenDialog(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to delete product");
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setProductToDelete(null);
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

  if (!products.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>No products found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom className="mb-4 text-center">
        Admin Dashboard - Product List
      </Typography>

      <div className="container">
        <TableContainer component={Paper} className="mb-5">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="fw-bold">
                  Product Name
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Price
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Category
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell align="center">{product.name || "N/A"}</TableCell>
                  <TableCell align="center">${product.price}</TableCell>
                  <TableCell align="center">{product.type || "N/A"}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(product)}
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
          <Typography>Are you sure you want to delete this product?</Typography>
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

export default ProductAdmin;
