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
import React, { useContext } from "react";
// import "./ShoppingCart.css";
import { Link } from "react-router-dom";
import { AppContext } from "../GlobalProvider";

export default function Checkout() {
	const { addedItemsInCart, setAddedItemsInCart } = useContext(AppContext);

	console.warn(addedItemsInCart);

	return (
		<section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
			<MDBContainer className="py-5 h-100">
				<MDBRow className="justify-content-center align-items-center h-100">
					<MDBCol>
						<MDBCard>
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
														src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
														fluid
														className="rounded-3"
														style={{
															width: "45px",
														}}
														alt="Avatar"
													/>
												</div>

												<p className="small">
													Provided Card type
												</p>
												{/* <a
																									href="visa"
																									type="submit"
																									className="text-white"
																								> */}
												<MDBCardImage
													className="me-2"
													width="45px"
													src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
													alt="Visa"
												/>
												{/* </a> */}
												{/* <a
																									href="American Express"
																									type="submit"
																									className="text-white"
																								> */}
												<MDBCardImage
													className="me-2"
													width="45px"
													src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
													alt="American-Express"
												/>
												{/* </a> */}
												{/* <a
																									href="Mastercard"
																									type="submit"
																									className="text-white"
																								> */}
												<MDBCardImage
													className="me-2"
													width="45px"
													src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
													alt="Mastercard"
												/>
												{/* </a> */}
												{/* <a
																									href="PayPal"
																									type="submit"
																									className="text-white"
																								> */}
												<MDBCardImage
													className="me-2"
													width="45px"
													src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
													alt="PayPal acceptance mark"
												/>
												{/* </a> */}

												<form className="mt-4">
													<MDBInput
														className="mb-4"
														label="Cardholder's Name"
														type="text"
														size="lg"
														placeholder="Cardholder's Name"
														contrast
													/>

													<MDBInput
														className="mb-4"
														label="Card Number"
														type="text"
														size="lg"
														minLength="19"
														maxLength="19"
														placeholder="1234 5678 9012 3457"
														contrast
													/>

													<MDBRow className="mb-4">
														<MDBCol md="6">
															<MDBInput
																className="mb-4"
																label="Expiration"
																type="text"
																size="lg"
																minLength="7"
																maxLength="7"
																placeholder="MM/YYYY"
																contrast
															/>
														</MDBCol>
														<MDBCol md="6">
															<MDBInput
																className="mb-4"
																label="Cvv"
																type="text"
																size="lg"
																minLength="3"
																maxLength="3"
																placeholder="&#9679;&#9679;&#9679;"
																contrast
															/>
														</MDBCol>
													</MDBRow>
												</form>

												<hr />

												<div className="d-flex justify-content-between">
													<p className="mb-2">
														Subtotal
													</p>
													<p className="mb-2">
														$4798.00
													</p>
												</div>

												<div className="d-flex justify-content-between">
													<p className="mb-2">
														Shipping
													</p>
													<p className="mb-2">
														$20.00
													</p>
												</div>

												<div className="d-flex justify-content-between">
													<p className="mb-2">
														Total(Incl. taxes)
													</p>
													<p className="mb-2">
														$4818.00
													</p>
												</div>

												<MDBBtn
													color="warning"
													block
													size="lg"
												>
													<div className="d-flex justify-content-center">
														{/* <span>$4818.00</span> */}
														<span>
															Place your order
															{/* Checkout{" "}
															<i className="fas fa-long-arrow-alt-right ms-2"></i> */}
														</span>
													</div>
												</MDBBtn>

												<MDBBtn
													color="info"
													block
													size="lg"
												>
													<Link to="/">
														<div className="d-flex justify-content-center">
															{/* <span>$4818.00</span> */}

															<span>
																Continue
																shopping
															</span>
														</div>
													</Link>
												</MDBBtn>
											</MDBCardBody>
										</MDBCard>
									</MDBCol>
								</MDBRow>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</section>
	);
}
