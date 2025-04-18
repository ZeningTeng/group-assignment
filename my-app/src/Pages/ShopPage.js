import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import Card from "../Components/Card";
import { TextField, Button } from "@mui/material";
import Footer from "../Components/Footer";

function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Perform any necessary actions when search is submitted, like API calls, etc.
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-md-8 offset-md-2">
            <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchSubmit}
              style={{ marginTop: "10px" }}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Pass searchQuery as prop to Card */}
        <Card searchQuery={searchQuery} />
      </div>
      <Footer/>
    </div>
  );
}

export default ShopPage;
