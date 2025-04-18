import React, { useEffect, useState } from "react";
import SuccessModal from "./SuccessModal";
import axios from "axios";

const SuccessPage = () => {
	const [showModal, setShowModal] = useState(true);

	useEffect(() => {
		const createOrder = async () => {
			try {
				const currentOrder = JSON.parse(
					sessionStorage.getItem("currentOrder")
				);

				console.log("save order to db");
				// Save order to DB after successful payment
				await axios.post("http://localhost:8000/create/order", {
					productLists: currentOrder.productList,
					userEmail: sessionStorage.getItem("userEmail"),
					date: new Date().toLocaleDateString("en-CA"), // e.g. 2024-04-20
					time: new Date()
						.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
							hour12: true,
						})
						.replace(" ", ""), // e.g. 09:15AM
					refundable: true,
					shippingFee: currentOrder.shippingFee,
					subtotal: currentOrder.subtotal,
					total: currentOrder.total,
					orderId: `ORDER-${Date.now()}-${Math.floor(
						1000 + Math.random() * 9000
					)}`,
				});
			} catch (err) {
				console.error("Failed to save order:", err);
			}
		};

		createOrder();
	}, []);

	return (
		<SuccessModal show={showModal} onClose={() => setShowModal(false)} />
	);
};

export default SuccessPage;
