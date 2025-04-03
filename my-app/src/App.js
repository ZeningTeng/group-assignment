import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './HomePage';
import Result from './Result';


function App() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

  
  }, [ location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Result" element={<Result />} />
    </Routes>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
