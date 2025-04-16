import React, { useState } from "react";
import {
	MDBContainer,
	MDBInput,
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBRow,
	MDBCol,
	MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";

export default function SignupPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:8000/user/create", formData);
			setMessage("Signup successful!");
			console.log(res.data);
		} catch (err) {
			console.error(err.response?.data?.error || err.message);
			setMessage(err.response?.data?.error || "Signup failed.");
		}
	};

	return (
		<MDBContainer className="py-5" style={{ maxWidth: "600px" }}>
			<MDBCard>
				<MDBCardBody className="p-4">
					<MDBTypography tag="h4" className="mb-4 text-center">
						Signup Page
					</MDBTypography>
					<form onSubmit={handleSubmit}>
						<MDBInput
							label="Full Name"
							name="name"
							type="text"
							value={formData.name}
							onChange={handleChange}
							required
							className="mb-4"
						/>
						<MDBInput
							label="Email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="mb-4"
						/>
						<MDBInput
							label="Password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="mb-4"
						/>

						<MDBBtn type="submit" block>
							Register
						</MDBBtn>
					</form>
					{message && (
						<MDBTypography tag="p" className="mt-3 text-center text-danger">
							{message}
						</MDBTypography>
					)}
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	);
}
