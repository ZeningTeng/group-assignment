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
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import axios from "axios";

function SupplierProduct() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "",
    price: "",
    oldPrice: "",
    suppliermail: user.email,
  });

  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("loading");
      const user = JSON.parse(localStorage.getItem("userInfo"));
      try {
        const response = await axios.get(
          apiUrl + "/product/getproduct/" + user.email
        );
        setProducts(response.data);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
        setError(error.response?.data?.message || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, [apiUrl]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await axios.delete(apiUrl + "/product/delete/" + productToDelete._id);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(apiUrl + "/product/create", newProduct);
      setProducts([...products, response.data.product]);
      setSnackbarMessage("Product added successfully!");
      setOpenSnackbar(true);
      const user = JSON.parse(localStorage.getItem("userInfo"));

      setNewProduct({
        name: "",
        type: "",
        price: "",
        oldPrice: "",
        suppliermail: user.email,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add product");
    }
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom className="mb-4 text-center">
        Admin Dashboard - Product List
      </Typography>

      {/* Add Product Form */}
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Product
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={newProduct.type}
                onChange={handleInputChange}
                label="Type"
                fullWidth
              >
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="sale">Sale</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Old Price"
              name="oldPrice"
              type="number"
              value={newProduct.oldPrice}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} display="flex" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              fullWidth
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Table */}
      {products.length > 0 ? (
        <TableContainer component={Paper} className="mb-5">
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Actions</TableCell>
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
      ) : (
        <Box textAlign="center" mt={4}>
          <Typography>
            No products found. Start listing your products!
          </Typography>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
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

      {/* Snackbar */}
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

      {/* Sticky Footer */}
      <Box component="footer" sx={{ mt: "auto", py: 2, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Supplier Admin Dashboard
        </Typography>
      </Box>
    </Box>
  );
}

export default SupplierProduct;
