import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ReportProblemIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h3" color="error" gutterBottom>
          403 - Unauthorized
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          You do not have permission to view this page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;
