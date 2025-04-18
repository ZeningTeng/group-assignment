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
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
} from "mdb-react-ui-kit";
import React, { useState, useContext, useEffect, useMemo } from "react";
import "./ShoppingCart.css";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../GlobalProvider";

export default function ShoppingCart() {
	const { addedItemsInCart, setAddedItemsInCart } = useContext(AppContext);
	const navigate = useNavigate();

	// Price Calculation
	// const [cartTotalPrice, setCartTotalPrice] = useState(0);

	// create current order
	const calCartTotalPrice = useMemo(() => {
		// todo: add userEmail, date when checkout
		let shippingFee = calShippingFee();
		let currentOrder = {
			refundable: true,
			shippingFee: shippingFee,
			productList: [],
		};

		let subtotal = 0;

		addedItemsInCart.forEach((item) => {
			subtotal += item.price * item.count;

			currentOrder.productList.push({
				productId: item.id,
				count: item.count,
				productName: item.productName,
				price: item.price,
			});
		});

		const total = ceilToSecondDecimal(subtotal + shippingFee);
		currentOrder.subtotal = ceilToSecondDecimal(subtotal);
		currentOrder.total = total;

		// console.warn(currentOrder);
		sessionStorage.setItem("currentOrder", JSON.stringify(currentOrder));

		return total;
	}, [addedItemsInCart]);

	function ceilToSecondDecimal(num) {
		return Math.ceil(num * 100) / 100;
	}

	function calShippingFee() {
		return addedItemsInCart.length * 5;
	}

	// Manage Product Count
	const handleDecrease = (id) => {
		let allItems = [...addedItemsInCart];
		allItems = allItems.map((item) =>
			item.id === id
				? { ...item, count: item.count > 1 ? item.count - 1 : 1 } // Prevent going below zero
				: item
		);

		setAddedItemsInCart(allItems);
	};

	const handleIncrease = (id) => {
		let allItems = [...addedItemsInCart];
		allItems = allItems.map((item) =>
			item.id === id
				? { ...item, count: item.count < 30 ? item.count + 1 : 30 } // Prevent going over 30
				: item
		);

		setAddedItemsInCart(allItems);
	};

	const deleteItem = (id) => {
		let allItems = [...addedItemsInCart];
		allItems = allItems.filter((item) => item.id !== id);

		setAddedItemsInCart(allItems);
	};

	// Sort Products
	const [sortOption, setSortOption] = useState("count");
	const handleSort = (option) => {
		setSortOption(option);

		if (option === "count") {
			setAddedItemsInCart(
				[...addedItemsInCart].sort((a, b) => a.count - b.count)
			);
		} else if (option === "name") {
			setAddedItemsInCart(
				[...addedItemsInCart].sort((a, b) =>
					a.productName.localeCompare(b.productName)
				)
			);
		}
	};

	return (
		<section
			className="h-100 h-custom diamond-background"
			// style={{ backgroundColor: "#eee", minHeight: "100vh" }}
			// style={{ backgroundColor: "#eee", minHeight: "100vh" }}
		>
			<MDBContainer fluid className="py-5 h-100">
				<MDBRow className="justify-content-center align-items-center h-100">
					<MDBCol>
						<MDBCard>
							<MDBCardBody className="p-4">
								<MDBRow>
									<MDBCol size="12" md="7">
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
											{/* sort dropdown */}

											<MDBDropdown>
												<MDBDropdownToggle
													color="white"
													className="text-dark"
													rippleColor="dark"
												>
													Sort by:{` `}
													{sortOption}
												</MDBDropdownToggle>
												<MDBDropdownMenu
													offset={[0, 8]}
												>
													<MDBDropdownItem
														link
														onClick={() =>
															handleSort("count")
														}
													>
														Count
													</MDBDropdownItem>
													<MDBDropdownItem
														link
														onClick={() =>
															handleSort("name")
														}
													>
														Name
													</MDBDropdownItem>
												</MDBDropdownMenu>
											</MDBDropdown>
										</div>
										{/* added products */}
										{addedItemsInCart.map((item, index) => (
											<MDBCard
												className="mb-3"
												key={`addedItemsInCart-${index}`}
											>
												<MDBCardBody>
													<div className="d-flex justify-content-between stacked-layout-custom">
														{/* image and product description */}
														<div className="d-flex flex-row align-items-center">
															{/* product image */}
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
															{/* product Name and material */}
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
														{/* quantity, price, trash */}
														<div className="d-flex flex-row align-items-center">
															{/* Quantity control */}
															<div
																className="d-inline-flex align-items-center justify-content-between me-5"
																style={{
																	border: "2px solid #FFD700", // Bright yellow border
																	borderRadius:
																		"40px", // Rounded edges
																	width: "90px", // Adjust width as needed
																	height: "30px", // Adjust height as needed
																}}
															>
																{/* Decrement button */}
																<MDBBtn
																	color="link"
																	onClick={() =>
																		handleDecrease(
																			item.id
																		)
																	}
																	style={{
																		padding:
																			"0",
																		margin: "0",
																		width: "33%",
																		background:
																			"transparent",
																		color: "#000",
																		fontSize:
																			"1.5rem",
																	}}
																>
																	-
																</MDBBtn>
																{/* Current count */}
																<span
																	style={{
																		width: "34%",
																		textAlign:
																			"center",
																	}}
																>
																	{item.count}
																</span>

																{/* Increment button */}
																<MDBBtn
																	color="link"
																	onClick={() =>
																		handleIncrease(
																			item.id
																		)
																	}
																	style={{
																		padding:
																			"0",
																		margin: "0",
																		width: "33%",
																		background:
																			"transparent",
																		color: "#000",
																		fontSize:
																			"1.5rem",
																	}}
																>
																	+
																</MDBBtn>
															</div>
															{/* price */}
															<div
																style={{
																	width: "80px",
																}}
															>
																<MDBTypography
																	tag="h6"
																	className="mb-0 me-2"
																>
																	$
																	{ceilToSecondDecimal(
																		item.price *
																			item.count
																	)}
																</MDBTypography>
															</div>
															{/* trash button */}
															<MDBBtn
																color="danger"
																size="sm"
																onClick={() =>
																	deleteItem(
																		item.id
																	)
																}
															>
																<MDBIcon
																	fas
																	icon="trash-alt"
																/>
															</MDBBtn>
														</div>
													</div>
												</MDBCardBody>
											</MDBCard>
										))}
									</MDBCol>

									<MDBCol size="12" md="5">
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
														// src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
														src="/assets/img/priceTag.png"
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
														{ceilToSecondDecimal(
															calCartTotalPrice -
																calShippingFee()
														)}
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
													disabled={
														addedItemsInCart.length ===
														0
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
