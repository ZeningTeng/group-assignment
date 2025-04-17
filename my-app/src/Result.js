import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext} from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AppContext } from "./GlobalProvider";
import { Link } from "react-router-dom";
function NavItem() {
  
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/');
    };
  
    return (
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" onClick={handleClick}>
          Home
        </a>
      </li>
    );
  }

function SearchBar() {
  
  const [name, setName] = useState('');
  const navigate = useNavigate();
   
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get('http://localhost:8000/search', {
      params: { name }
    });
    navigate('/result', { state: { results: response.data } });
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="name"
          placeholder="Search some thing here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px' }}>search</button>
      </form>
    </div>
  );
}

const ResultPage = () => {
  const { state } = useLocation();
  let results = state?.results || [];

  useEffect(() => {
    console.log("Received results:", results);
  }, [results]);


  if (!Array.isArray(results)) {
    results = [results];
  }
  const [token, setToken] = useState(null);
    
  const [userInfo, setUserInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { cartCount, setCartCount, addedItemsInCart, setAddedItemsInCart } =
 useContext(AppContext)
  const [openSnackBar, setOpenSnackBar] = useState(false);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken);

			axios
				.get("http://localhost:8000/profile", {
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				})
				.then((res) => {
					console.log(res.data.user);
					setUserInfo(res.data.user);
				})
				.catch((err) => {
					console.error("failed", err);
				});
		}
	}, []);
const addToCart = (id, productName, imagePath, weight, material, price) => {
// console.warn(id);
let allItems = [...addedItemsInCart];
if (!allItems.find((item) => item.id === id)) {
  allItems.push({
    id: id,
    count: 1,
    productName: productName,
    imagePath: imagePath,
    weight: weight,
    material: material,
    price: price,
  });
} else {
  allItems = allItems.map((item) =>
    item.id === id ? { ...item, count: item.count + 1 } : item
  );
}
setAddedItemsInCart(allItems);
setCartCount(allItems.length); 

setOpenSnackBar(true);
};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
const handleSignOut = () => {
  localStorage.removeItem("token");
  setToken(null);
  setUserInfo(null);
  handleMenuClose();
  navigate("/");
};
const handleProfile = () => {
  handleMenuClose();
  navigate("/profile");
};
const goToLogin = () => {
  navigate("/login");
};
const handleControlPanel = () => {
  navigate("/controlPanel", { state: { userInfo } });
};
  return (
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
       
        <div className="container px-4 px-lg-1">
          <a className="navbar-brand" href="#!">
            Jewelry Shop
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
             <NavItem />
           
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  more about us
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#!">
                      All Products
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Popular Items
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      New Arrivals
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                                    {userInfo && userInfo.type === "admin" ? (
                                  <Button onClick={handleControlPanel}>Control Panel</Button>) : null}
              
                                </li>
            </ul>
            <SearchBar />
            <form className="d-flex">
									<Link to="/cart">
										<button
											className="btn btn-outline-dark"
											type="submit"
										>
											<i className="bi-cart-fill me-1" />
											Cart
											<span
												className={`badge text-white ms-1 rounded-pill ${
													cartCount > 0
														? "bg-danger pulse"
														: "bg-dark"
												}`}
											>
												{cartCount}
											</span>
										</button>
									</Link>
								</form>
            <ul className="navbar-nav ">
              <li className="nav-item">
                {userInfo ? (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          sx={{ marginRight: 2 }}
                                        >
                                          {userInfo.name}
                                        </Typography>
                                        <Button onClick={handleSignOut}>
                                         signout
                                        </Button>
                                      </Box>
                                      
                                      
                                    ) : (
                                      <Button onClick={goToLogin}>
                                        Login Page
                                      </Button>
                                    )}
              </li>
            </ul>
        
          </div>
        </div>
      </nav>

 
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      
        {results[0]?.products?.length === 0 ? (
          <Typography variant="h5" align="center">
            Sorry, nothing found.
          </Typography>
        ) : (
          results.map((outerItem, i) =>
            outerItem.products.map((product, j) => (
              <Card
                key={`${i}-${j}`}
                variant="outlined"
                sx={{
                  marginBottom: '1rem',
                  border: '2px solid #ccc',      
                  borderRadius: '8px',
                  overflow: 'visible'          
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {product.name || 'No Name'}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Price: {product.price || 'N/A'}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Count: {product.count || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                    {product.description || 'No Description'}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="600"
                    image={product.imagePath}
                    alt={product.name}
                    sx={{ marginTop: '1rem' }}
                  />
                </CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                <button
														className="btn btn-outline-dark mt-auto"
														onClick={() =>
															addToCart(
																product.id,
																product.name,
																product.imagePath,
																product.weight,
																product.material,
																product.discountedPrice ||
																	product.originalPrice
															)
														}
													>
														Add to cart
													</button>
                </Box>
              </Card>
            ))
          )
        )}
      </Container>
    </div>
  );
};

export default ResultPage;
