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
import "./ShoppingCart.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../GlobalProvider";

export default function ShoppingCart() {
	const { addedItemsInCart, setAddedItemsInCart } = useContext(AppContext);
	const navigate = useNavigate();
	console.warn(addedItemsInCart);

	return (
		<section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
			<MDBContainer className="py-5 h-100">
				<MDBRow className="justify-content-center align-items-center h-100">
					<MDBCol>
						<MDBCard>
							<MDBCardBody className="p-4">
								<MDBRow>
									<MDBCol lg="7">
										<MDBTypography tag="h5">
											<Link to="/">
												<MDBIcon
													fas
													icon="angle-left"
												/>{" "}
												Continue shopping
											</Link>
										</MDBTypography>

										<hr />

										<div className="d-flex justify-content-between align-items-center mb-4">
											<div>
												<p className="mb-1">
													Shopping cart
												</p>
												<p className="mb-0">
													You have 4 items in your
													cart
												</p>
											</div>
											<div>
												<p>
													<span className="">
														{`Sort by: `}
													</span>
													<a
														href="#!"
														className="text-body"
													>
														price
														<MDBIcon
															fas
															icon="angle-down mt-1"
														/>
													</a>
												</p>
											</div>
										</div>

										<MDBCard className="mb-3">
											<MDBCardBody>
												<div className="d-flex justify-content-between">
													<div className="d-flex flex-row align-items-center">
														<div>
															<MDBCardImage
																src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
																fluid
																className="rounded-3"
																style={{
																	width: "65px",
																}}
																alt="Shopping item"
															/>
														</div>
														<div className="ms-3">
															<MDBTypography tag="h5">
																Iphone 11 pro
															</MDBTypography>
															<p className="small mb-0">
																256GB, Navy Blue
															</p>
														</div>
													</div>
													<div className="d-flex flex-row align-items-center">
														<div
															style={{
																width: "50px",
															}}
														>
															<MDBTypography
																tag="h5"
																className="fw-normal mb-0"
															>
																2
															</MDBTypography>
														</div>
														<div
															style={{
																width: "80px",
															}}
														>
															<MDBTypography
																tag="h5"
																className="mb-0"
															>
																$900
															</MDBTypography>
														</div>
														<a
															href="#!"
															style={{
																color: "#cecece",
															}}
														>
															<MDBIcon
																fas
																icon="trash-alt"
															/>
														</a>
													</div>
												</div>
											</MDBCardBody>
										</MDBCard>

										<MDBCard className="mb-3">
											<MDBCardBody>
												<div className="d-flex justify-content-between">
													<div className="d-flex flex-row align-items-center">
														<div>
															<MDBCardImage
																src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
																fluid
																className="rounded-3"
																style={{
																	width: "65px",
																}}
																alt="Shopping item"
															/>
														</div>
														<div className="ms-3">
															<MDBTypography tag="h5">
																Samsung galaxy
																Note 10
															</MDBTypography>
															<p className="small mb-0">
																256GB, Navy Blue
															</p>
														</div>
													</div>
													<div className="d-flex flex-row align-items-center">
														<div
															style={{
																width: "50px",
															}}
														>
															<MDBTypography
																tag="h5"
																className="fw-normal mb-0"
															>
																2
															</MDBTypography>
														</div>
														<div
															style={{
																width: "80px",
															}}
														>
															<MDBTypography
																tag="h5"
																className="mb-0"
															>
																$900
															</MDBTypography>
														</div>
														<a
															href="#!"
															style={{
																color: "#cecece",
															}}
														>
															<MDBIcon
																fas
																icon="trash-alt"
															/>
														</a>
													</div>
												</div>
											</MDBCardBody>
										</MDBCard>

										<MDBCard className="mb-3">
											<MDBCardBody>
												<div className="d-flex justify-content-between">
													<div className="d-flex flex-row align-items-center">
														<div>
															<MDBCardImage
																src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp"
																fluid
																className="rounded-3"
																style={{
																	width: "65px",
																}}
																alt="Shopping item"
															/>
														</div>
														<div className="ms-3">
															<MDBTypography tag="h5">
																Canon EOS M50
															</MDBTypography>
															<p className="small mb-0">
																Onyx Black
															</p>
														</div>
													</div>
													<div className="d-flex flex-row align-items-center">
														<div
															style={{
																width: "50px",
															}}
														>
															<MDBTypography
																tag="h5"
																className="fw-normal mb-0"
															>
																1
															</MDBTypography>
														</div>
														<div
															style={{
																width: "80px",
															}}
														>
															<MDBTypography
																tag="h5"
																className="mb-0"
															>
																$1199
															</MDBTypography>
														</div>
														<a
															href="#!"
															style={{
																color: "#cecece",
															}}
														>
															<MDBIcon
																fas
																icon="trash-alt"
															/>
														</a>
													</div>
												</div>
											</MDBCardBody>
										</MDBCard>

										<MDBCard className="mb-3">
											<MDBCardBody>
												<div className="d-flex justify-content-between">
													<div className="d-flex flex-row align-items-center">
														<div>
															<MDBCardImage
																src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
																fluid
																className="rounded-3"
																style={{
																	width: "65px",
																}}
																alt="Shopping item"
															/>
														</div>
														<div className="ms-3">
															<MDBTypography tag="h5">
																MacBook Pro
															</MDBTypography>
															<p className="small mb-0">
																1TB, Graphite
															</p>
														</div>
													</div>
													<div className="d-flex flex-row align-items-center">
														<div
															style={{
																width: "50px",
															}}
														>
															<MDBTypography
																tag="h5"
																className="fw-normal mb-0"
															>
																1
															</MDBTypography>
														</div>
														<div
															style={{
																width: "80px",
															}}
														>
															<MDBTypography
																tag="h5"
																className="mb-0"
															>
																$1799
															</MDBTypography>
														</div>
														<a
															href="#!"
															style={{
																color: "#cecece",
															}}
														>
															<MDBIcon
																fas
																icon="trash-alt"
															/>
														</a>
													</div>
												</div>
											</MDBCardBody>
										</MDBCard>
									</MDBCol>

									<MDBCol lg="5">
										<MDBCard className="bg-primary text-white rounded-3">
											<MDBCardBody>
												<div className="d-flex justify-content-between align-items-center mb-4">
													<MDBTypography
														tag="h5"
														className="mb-0"
													>
														Estimated Price
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
													color="info"
													block
													size="lg"
													onClick={() =>
														navigate("/checkout")
													}
												>
													<div className="d-flex justify-content-between">
														<span>$4818.00</span>
														<span>
															Checkout{" "}
															<i className="fas fa-long-arrow-alt-right ms-2"></i>
														</span>
													</div>
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
