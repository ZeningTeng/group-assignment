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
} from "@mui/material";
import axios from "axios";

function SupplierUser() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("loading");
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const response = await axios.get(
          `${apiUrl}/product/getproduct/${user.email}`
        );
        setProducts(response.data);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
        setError(error.response?.data?.message || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);

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
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box flex="1" p={4}>
        <Typography variant="h4" gutterBottom>
          Supplier Dashboard
        </Typography>

        <Box mb={3}>
          <Typography variant="h6">
            Number of Products: {products.length}
          </Typography>
          <Typography variant="h6">
            Total Price of Products: {totalPrice.toFixed(2)}$
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Product Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Price</strong>
                </TableCell>
                <TableCell>
                  <strong>Old Price</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{product.price.toFixed(2)}$</TableCell>
                  <TableCell>
                    {product.oldPrice ? `${product.oldPrice.toFixed(2)}$` : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        py={2}
        textAlign="center"
        bgcolor="#f0f0f0"
        mt="auto"
      >
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Supplier Portal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default SupplierUser;
