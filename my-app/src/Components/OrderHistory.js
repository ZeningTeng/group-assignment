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
// import "./ShoppingCart.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../GlobalProvider";
import { orders } from "../model/orderHistory";

export default function OrderHistory() {
	const {
		addedItemsInCart,
		// setAddedItemsInCart,
		cartTotalPrice,
		setCartTotalPrice,
	} = useContext(AppContext);
	const navigate = useNavigate();

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
										{/* added products */}
										{orders.map((order, index) => (
											<MDBCard
												className="mb-3"
												key={order.id}
											>
												<MDBCardBody>
													<div className="d-flex justify-content-between">
														<div className="d-flex flex-row align-items-center">
															{/* <div>
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
															</div> */}
															<div className="ms-3">
																<MDBTypography tag="h5">
																	Order ID:{" "}
																	{order.id}
																</MDBTypography>
																<p className="small mb-0">
																	{
																		order.expense
																	}
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
																	{
																		order.expense
																	}
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
																</MDBTypography>
															</div>
															<MDBBtn
																color="info"
																// block
																size="small"
																onClick={() =>
																	navigate(
																		"/checkout"
																	)
																}
															>
																refund
															</MDBBtn>
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
								</MDBRow>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</section>
	);
}
