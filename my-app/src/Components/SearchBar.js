import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SearchBar() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await axios.get("http://localhost:8000/search", {
      params: { name },
    });

    navigate("/result", { state: { results: response.data } });
  };

  return (
    <div className="mx-3">
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <input
          type="name"
          placeholder="Enter keyword"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px" }}>
          Search
        </button>
      </form>
    </div>
  );
}
export default SearchBar;
