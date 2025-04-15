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
import React, { useContext, useEffect, useMemo } from "react";
import "./ShoppingCart.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../GlobalProvider";

export default function ShoppingCart() {
	const {
		addedItemsInCart,
		// setAddedItemsInCart,
		cartTotalPrice,
		setCartTotalPrice,
	} = useContext(AppContext);
	const navigate = useNavigate();
	// console.warn(addedItemsInCart);

	const calCartTotalPrice = useMemo(() => {
		let total = 0;
		addedItemsInCart.forEach((item) => {
			total += item.price * item.count;
		});
		total = total + calShippingFee();
		return ceilToSecondDecimal(total);
	}, [addedItemsInCart]);

	function ceilToSecondDecimal(num) {
		return Math.ceil(num * 100) / 100;
	}

	function calShippingFee() {
		return addedItemsInCart.length * 5;
	}

	return (
		<section
			className="h-100 h-custom"
			style={{ backgroundColor: "#eee", minHeight: "100vh" }}
		>
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
												<MDBIcon
													fas
													icon="shopping-cart"
													className="text-primary"
												/>{" "}
												<span className="h5 mb-1">
													Shopping cart
												</span>
												<p className="mb-0">
													You have{" "}
													<span className="fw-bold text-warning">
														{
															addedItemsInCart.length
														}{" "}
													</span>
													items in your cart
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
										{/* added products */}
										{addedItemsInCart.map((item, index) => (
											<MDBCard
												className="mb-3"
												key={`addedItemsInCart-${index}`}
											>
												<MDBCardBody>
													<div className="d-flex justify-content-between">
														<div className="d-flex flex-row align-items-center">
															<div>
																<MDBCardImage
																	src={
																		item.imagePath
																	}
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
																	{
																		item.productName
																	}
																</MDBTypography>
																<p className="small mb-0">
																	{
																		item.weight
																	}
																	{item.material &&
																		`, ${item.material}`}
																</p>
															</div>
														</div>
														<div className="d-flex flex-row align-items-center">
															<div
																style={{
																	width: "120px",
																}}
															>
																<MDBTypography
																	tag="h5"
																	className="fw-normal mb-0"
																>
																	Quantity:{" "}
																	{item.count}
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
																	$
																	{ceilToSecondDecimal(
																		item.price *
																			item.count
																	)}
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
										))}
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
														$
														{calCartTotalPrice -
															calShippingFee()}
													</p>
												</div>

												<div className="d-flex justify-content-between">
													<p className="mb-2">
														Shipping
													</p>
													<p className="mb-2">
														${calShippingFee()}
													</p>
												</div>

												<div className="d-flex justify-content-between">
													<p className="mb-2">
														Total(Incl. taxes)
													</p>
													<p className="mb-2">
														${calCartTotalPrice}
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
														<span>
															${calCartTotalPrice}
														</span>
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
