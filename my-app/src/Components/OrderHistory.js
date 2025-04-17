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
import React, { useState, useContext, useEffect, useMemo } from "react";
// import "./ShoppingCart.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../GlobalProvider";
import { orders } from "../model/orderHistory";
import ExpandableCard from "./ExpandableCard";

export default function OrderHistory() {
	const {
		addedItemsInCart,
		// setAddedItemsInCart,
		cartTotalPrice,
		setCartTotalPrice,
	} = useContext(AppContext);
	const navigate = useNavigate();
	const [expandedCard, setExpandedCard] = useState(null);

	return (
		<section
			className="h-100 h-custom diamond-background"
			style={{ backgroundColor: "#eee", minHeight: "100vh" }}
		>
			<MDBContainer className="py-5 h-100">
				<MDBRow className="justify-content-center align-items-center h-100">
					<MDBCol>
						<MDBCard>
							<MDBCardBody className="p-4">
								<MDBRow>
									<MDBCol lg="7">
										<MDBTypography
											tag="h5"
											className="text-primary"
										>
											{/* <Link to="/"> */}
											{/* <MDBIcon
													fas
													icon="angle-left"
												/>{" "} */}
											<MDBIcon
												fas
												icon="shopping-cart"
												className="text-primary"
											/>
											Order History
											{/* </Link> */}
										</MDBTypography>
										<hr />
										<div className="d-flex justify-content-between align-items-center mb-4">
											<div>
												<p className="mb-0">
													You have{" "}
													<span className="fw-bold text-warning">
														{orders.length}{" "}
													</span>
													orders in the past
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
										{/* order history */}

										{orders.map((order) => (
											<ExpandableCard
												key={order.orderId}
												order={order}
												expandedCard={expandedCard}
												setExpandedCard={
													setExpandedCard
												}
												navigate={navigate}
											/>
										))}
									</MDBCol>
									<MDBCol size="12" md="5">
										<div
											// src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
											src="/assets/img/priceTag.png"
											className="thanks-order-background mt-5"
											alt="Avatar"
										/>
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
