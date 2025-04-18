import React, { useState } from "react";
import SuccessModal from "./SuccessModal";

const SuccessPage = () => {
	const [showModal, setShowModal] = useState(true);

	return (
		<SuccessModal show={showModal} onClose={() => setShowModal(false)} />
	);
};

export default SuccessPage;
