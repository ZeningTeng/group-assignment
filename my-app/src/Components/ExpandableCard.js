import React from "react";
import {
	MDBCard,
	MDBCardBody,
	MDBTypography,
	MDBBtn,
	MDBIcon,
} from "mdb-react-ui-kit";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { AppContext } from "../GlobalProvider";

export default function ExpandableCard({
	order,
	expandedCard,
	setExpandedCard,
	navigate,
}) {
	const { userEmail, setUserEmail } = useContext(AppContext);
	const isExpanded = expandedCard === order.orderId;
	const [showModal, setShowModal] = useState(false);
	const [orderRefundable, setOrderRefundable] = useState(order.refundable);

	const RefundModal = ({ show, onConfirm, onClose }) => {
		return (
			<Modal show={show} onHide={onClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Refund</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to refund?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="danger" onClick={onConfirm}>
						Refund
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const processRefund = () => {
		console.log("Refund processed");
		setShowModal(false);
		// set local state to not refundable and update order history
		setOrderRefundable(false);
		updateRefundStatus(userEmail, order.orderId, false);
	};

	const updateRefundStatus = async (email, orderId, isRefundable) => {
		try {
			const res = await axios.put("http://localhost:8000/update/refund", {
				email: email,
				orderId: orderId,
				refundable: isRefundable,
			});
			console.log(`api response: ${res.data.message}`);
		} catch (error) {
			console.error("Update failed:", error);
		}
	};

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
								- Total expense: ${order.total}
							</p>
							<p className="small mb-0">
								- Order date: {order.date} {order.time}
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
										<p className="small mb-0">
											🚙 Shipping fee: $
											{order.shippingFee}
										</p>
										{order.productLists.map((product) => (
											<div key={product.productId}>
												<p className="small mb-0">
													💎 Product name:{" "}
													{product.productName}
												</p>
												<p className="small mb-0">
													💰 price: ${product.price}
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
							onClick={() => setShowModal(true)}
							disabled={!orderRefundable}
						>
							Refund
						</MDBBtn>
						<RefundModal
							show={showModal}
							onClose={() => setShowModal(false)}
							onConfirm={processRefund}
						/>
					</div>
				</div>
			</MDBCardBody>
		</MDBCard>
	);
}
