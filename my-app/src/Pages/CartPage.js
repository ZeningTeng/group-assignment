import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Avatar,
  Box,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { Add, Remove, Delete, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { Snackbar, Alert } from "@mui/material";
import emailjs from "emailjs-com";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const navigate = useNavigate();

  // Load cart from localStorage once when the page is loaded
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add quantity if missing
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
  }, []);

  // Update localStorage when cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);

    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleProceedToCheckout = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userEmail = userInfo?.email;
    const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
    const USER_ID = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

    if (!userEmail) {
      console.error("User email is missing.");
      setSnackbarMessage(
        "Unable to retrieve your email. Please make sure you are logged in."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const message = `Your order has been placed. Here are your cart details: 
                     ${cartItems
                       .map(
                         (item) =>
                           `${item.name} (x${item.quantity}) - $${(
                             item.price * item.quantity
                           ).toFixed(2)}`
                       )
                       .join(", ")}
                     Total: $${getTotalPrice()}`;

    const templateParams = {
      user_email: userEmail,
      message: message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
      (response) => {
        console.log("Email sent successfully:", response);
        setOrderPlaced(true); // ✅ Mark the order as placed
        setSnackbarMessage(
          "Order placed successfully! You will receive a confirmation email."
        );
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
      (err) => {
        console.error("Error sending email:", err);
        setSnackbarMessage(
          "There was an error placing your order. Please try again later."
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    );
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 1 }}>
          Shopping Cart
        </Typography>
      </Box>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleQuantityChange(item._id, -1)}
                      >
                        <Remove />
                      </IconButton>
                      {item.quantity}
                      <IconButton
                        onClick={() => handleQuantityChange(item._id, 1)}
                      >
                        <Add />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Total: ${getTotalPrice()}</Typography>
            {orderPlaced ? (
              <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
                Order Placed!
              </Typography>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            )}
            {/* Snackbar for feedback */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000} // Snackbar will automatically hide after 3 seconds
              onClose={() => setOpenSnackbar(false)}
            >
              <Alert
                onClose={() => setOpenSnackbar(false)}
                severity={snackbarSeverity}
                sx={{ width: "100%" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>
        </>
      )}
      <div className="mt-4">
        {" "}
        <Footer />
      </div>
    </Container>
  );
}

export default CartPage;
