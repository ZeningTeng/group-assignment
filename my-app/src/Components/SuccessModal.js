// SuccessModal.js
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SuccessModal = ({ show, onClose }) => {
	const modalRef = useRef(null);
	const navigate = useNavigate();

	// ✅ Redirect handler
	const handleConfirm = () => {
		onClose?.(); // Close modal state in parent
		navigate("/"); // Redirect to homepage
		window.location.reload(); // Reload page
	};

	useEffect(() => {
		if (show && modalRef.current) {
			const modal = new window.bootstrap.Modal(modalRef.current);

			// Show modal
			modal.show();

			// ✅ Handle backdrop click or ❌ close button
			const handleHide = () => {
				handleConfirm();
			};

			modalRef.current.addEventListener("hidden.bs.modal", handleHide);

			// ✅ Cleanup listener when unmounted
			return () => {
				modalRef.current?.removeEventListener(
					"hidden.bs.modal",
					handleHide
				);
			};
		}
	}, [show]); // don't depend on handleConfirm to avoid re-binding

	return (
		<div
			ref={modalRef}
			className="modal fade"
			tabIndex="-1"
			id="successModal"
			aria-labelledby="successModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header bg-success text-white">
						<h5 className="modal-title" id="successModalLabel">
							Payment Successful
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						Your payment has been processed successfully! 🎉
					</div>
					<div className="modal-footer">
						<button
							className="btn btn-success"
							onClick={handleConfirm}
						>
							Go to Homepage
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccessModal;
