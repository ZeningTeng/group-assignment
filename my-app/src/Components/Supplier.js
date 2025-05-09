import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBInput,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState, useContext } from "react";
// import "./ShoppingCart.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../GlobalProvider";

export default function Checkout() {
	const navigate = useNavigate();
	const { addedItemsInCart, setAddedItemsInCart } = useContext(AppContext);
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

	// Form states
	const [form, setForm] = useState({
		name: "",
		cardNumber: "",
		expiration: "",
		cvv: "",
	});

	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};

		if (!/^[a-zA-Z ]{1,10}$/.test(form.name)) {
			newErrors.name = "Name must be up to 10 letters only.";
		}

		if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) {
			newErrors.cardNumber = "Card number must be exactly 16 digits.";
		}

		if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(form.expiration)) {
			newErrors.expiration = "Expiration must be in MM/YYYY format.";
		}

		if (!/^\d{3}$/.test(form.cvv)) {
			newErrors.cvv = "CVV must be exactly 3 digits.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "expiration") {
			let raw = value.replace(/\D/g, "");
			if (raw.length >= 3) {
				raw = raw.slice(0, 2) + "/" + raw.slice(2, 6);
			}
			setForm((prev) => ({ ...prev, [name]: raw }));
		} else if (name === "cardNumber") {
			const digitsOnly = value.replace(/\D/g, "");
			const formatted =
				digitsOnly
					.match(/.{1,4}/g)
					?.join(" ")
					.slice(0, 19) || "";
			setForm((prev) => ({ ...prev, [name]: formatted }));
		} else if (name === "cvv") {
			const onlyDigits = value.replace(/\D/g, "").slice(0, 3);
			setForm((prev) => ({ ...prev, [name]: onlyDigits }));
		} else if (name === "name") {
			const onlyLetters = value.replace(/[^a-zA-Z ]/g, "").slice(0, 10);
			setForm((prev) => ({ ...prev, [name]: onlyLetters }));
		} else {
			setForm((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			navigate("/order-history");
		}
		console.warn(form);
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
							<MDBCol lg="5">
								<MDBCard className="bg-primary text-white rounded-3">
									<MDBCardBody>
										<div className="d-flex justify-content-between align-items-center mb-4">
											<MDBTypography
												tag="h5"
												className="mb-0"
											>
												Card details
											</MDBTypography>
											<MDBCardImage
												// src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
												src="/assets/img/creditCard.png"
												fluid
												className="rounded-3"
												style={{
													width: "45px",
												}}
												alt="Credit card"
											/>
										</div>

										<p className="small">
											Provided Card type
										</p>

										<MDBCardImage
											className="me-2"
											width="45px"
											src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
											alt="Visa"
										/>

										<MDBCardImage
											className="me-2"
											width="45px"
											src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
											alt="American-Express"
										/>

										<MDBCardImage
											className="me-2"
											width="45px"
											src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
											alt="Mastercard"
										/>

										<MDBCardImage
											className="me-2"
											width="45px"
											src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
											alt="PayPal acceptance mark"
										/>

										<form
											className="mt-4"
											onSubmit={handleSubmit}
										>
											<MDBInput
												className="mb-4"
												label="Cardholder's Name"
												type="text"
												size="lg"
												placeholder="Cardholder's Name"
												contrast
												name="name"
												value={form.name}
												onChange={handleChange}
											/>{" "}
											{errors.name && (
												<div className="text-warning small mt-n4 mb-2">
													{errors.name}
												</div>
											)}
											<MDBInput
												className="mb-4"
												label="Card Number"
												type="text"
												size="lg"
												// minLength="19"
												maxLength="19"
												placeholder="1234 5678 9012 3457"
												contrast
												name="cardNumber"
												value={form.cardNumber}
												onChange={handleChange}
											/>
											{errors.cardNumber && (
												<div className="text-warning small mt-n4 mb-2">
													{errors.cardNumber}
												</div>
											)}
											<MDBRow className="mb-4">
												<MDBCol md="6">
													<MDBInput
														className="mb-4"
														label="Expiration"
														type="text"
														size="lg"
														// minLength="7"
														maxLength="7"
														placeholder="MM/YYYY"
														contrast
														name="expiration"
														value={form.expiration}
														onChange={handleChange}
													/>
													{errors.expiration && (
														<div className="text-warning small mt-n4">
															{errors.expiration}
														</div>
													)}
												</MDBCol>
												<MDBCol md="6">
													<MDBInput
														className="mb-4"
														label="Cvv"
														type="text"
														size="lg"
														// minLength="3"
														maxLength="3"
														placeholder="&#9679;&#9679;&#9679;"
														contrast
														name="cvv"
														value={form.cvv}
														onChange={handleChange}
													/>{" "}
													{errors.cvv && (
														<div className="text-warning small mt-n4">
															{errors.cvv}
														</div>
													)}
												</MDBCol>
											</MDBRow>
											<hr />
											<div className="d-flex justify-content-between">
												<p className="mb-2">Subtotal</p>
												<p className="mb-2">$4798.00</p>
											</div>
											<div className="d-flex justify-content-between">
												<p className="mb-2">Shipping</p>
												<p className="mb-2">$20.00</p>
											</div>
											<div className="d-flex justify-content-between">
												<p className="mb-2">
													Total(Incl. taxes)
												</p>
												<p className="mb-2">$4818.00</p>
											</div>
											<MDBBtn
												color="warning"
												block
												size="lg"
												type="submit"
											>
												<div className="d-flex justify-content-center">
													<span>
														Place your order
													</span>
												</div>
											</MDBBtn>
										</form>
										<MDBBtn
											color="info"
											className="text-primary mt-3"
											block
											size="lg"
											onClick={() => navigate("/")}
										>
											<div className="d-flex justify-content-center">
												{/* <span>$4818.00</span> */}

												<span>Continue shopping</span>
											</div>
										</MDBBtn>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</MDBRow>
					</MDBCardBody>
					{/* </MDBCard> */}
					{/* </MDBCol> */}
				</MDBRow>
			</MDBContainer>
		</section>
	);
}
