import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCol,
	MDBContainer,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState, useContext } from "react";
// import "./ShoppingCart.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../GlobalProvider";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default function About() {
	const navigate = useNavigate();
	const { addedItemsInCart, setAddedItemsInCart } = useContext(AppContext);
	const [currentOrder, setCurrentOrder] = useState(
		JSON.parse(sessionStorage.getItem("currentOrder")) || []
	);
	const buttonStyle = {
		position: "fixed", // Use "fixed" for always visible
		top: "22px", // Distance from top
		left: "30px", // Distance from left
		backgroundColor: "#007bff",
		border: "none",
		color: "white",
		padding: "10px 20px",
		fontSize: "20px",
		cursor: "pointer",
		transition: "background-color 0.3s ease",
		// clip-path 以一個多邊形定義按鈕形狀：這個多邊形會產生一個向左的箭頭形狀
		clipPath: "polygon(0% 50%, 85% 0%, 100% 50%, 85% 100%)",
	};

	return (
		<section className="h-100 h-custom diamond-background">
			<MDBContainer className="py-5 h-100">
				<MDBRow className="justify-content-center align-items-center h-100">
					{/* <MDBCol> */}
					{/* <MDBCard> */}
					<div>
						<button
							type="button"
							onClick={() => navigate("/")}
							style={buttonStyle}
						>
							← Home
						</button>
					</div>
					<MDBCardBody className="p-4">
						<MDBRow className="justify-content-center align-items-center h-100">
							<div className="col-lg-6 col-md-6 col-12">
								<div
									className="about-container"
									style={{
										padding: "30px",
										background: "white",
										borderRadius: "12px",
										boxShadow:
											"0 8px 24px rgba(0,0,0,0.15)",
									}}
								>
									<h3
										className="text-center mb-4"
										style={{
											color: "#333",
											fontWeight: 600,
										}}
									>
										Believe it or not! We have...
									</h3>
									<div className="row">
										<div className="col-md-6 mb-3">
											<div className="card border-0 shadow-sm h-100">
												<div className="card-body">
													<div className="d-flex align-items-center mb-2">
														<i className="bi bi-gem fs-3 text-warning me-2"></i>
														<h5 className="card-title mb-0">
															Exquisite
															Craftsmanship
														</h5>
													</div>
													<p>
														Our jewelry pieces are
														crafted with precision
														and passion, ensuring
														every item is a
														masterpiece.
													</p>
												</div>
											</div>
										</div>
										<div className="col-md-6 mb-3">
											<div className="card border-0 shadow-sm h-100">
												<div className="card-body">
													<div className="d-flex align-items-center mb-2">
														<i className="bi bi-shield-check fs-3 text-success me-2"></i>
														<h5 className="card-title mb-0">
															Unmatched Quality
														</h5>
													</div>
													<p>
														We use only the finest
														materials, ensuring
														durability and
														brilliance in every
														piece.
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-md-12">
											<div className="card border-0 shadow-sm h-100">
												<div className="card-body text-center">
													<i className="bi bi-globe fs-3 text-secondary"></i>
													<h5>Community Impact</h5>
													<p>
														By shopping with us,
														you're supporting local
														artisans and
														contributing to the
														growth of our community.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</MDBRow>
					</MDBCardBody>
					{/* </MDBCard> */}
					{/* </MDBCol> */}
				</MDBRow>
			</MDBContainer>
		</section>
	);
}
