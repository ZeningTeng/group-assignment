import React from "react";
import {
	MDBCard,
	MDBCardBody,
	MDBTypography,
	MDBBtn,
	MDBIcon,
} from "mdb-react-ui-kit";
import { motion, AnimatePresence } from "framer-motion";

export default function ExpandableCard({
	order,
	expandedCard,
	setExpandedCard,
	navigate,
}) {
	const isExpanded = expandedCard === order.orderId;

	return (
		<MDBCard className="mb-3">
			<MDBCardBody>
				<div className="d-flex justify-content-between">
					<div className="d-flex flex-row align-items-center">
						<div className="ms-3">
							<MDBTypography tag="h5">
								Order ID: {order.orderId}
							</MDBTypography>
							<p className="small mb-0">
								- Total expense: ${order.expense}
							</p>
							<p className="small mb-0">
								- Order date: {order.date}
							</p>

							{/* Expandable content */}
							<AnimatePresence initial={false}>
								{isExpanded && (
									<motion.div
										key="expand"
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
										}}
									>
										<hr />
										{order.productLists.map((product) => (
											<div key={product.productId}>
												<p className="small mb-0">
													- Product name:{" "}
													{product.productName}
												</p>
												<p className="small mb-0">
													{`# Count: ${product.count}`}
												</p>
											</div>
										))}

										{/* Add more detail fields as needed */}
									</motion.div>
								)}
							</AnimatePresence>

							{/* Expand / Collapse button */}
							<MDBBtn
								size="sm"
								color="link"
								onClick={() =>
									setExpandedCard(
										isExpanded ? null : order.orderId
									)
								}
							>
								{isExpanded ? "Collapse" : "Expand"}
								<MDBIcon fas icon="angle-down mt-1 ms-1" />
							</MDBBtn>
						</div>
					</div>

					<div className="d-flex flex-row align-items-center">
						<MDBBtn
							size="sm"
							color="info"
							// onClick={() => }
						>
							Refund
						</MDBBtn>
					</div>
				</div>
			</MDBCardBody>
		</MDBCard>
	);
}
