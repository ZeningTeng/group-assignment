import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
	const navigate = useNavigate();

	const [name, setname] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:8000/login",
				{ name, password },
				{ withCredentials: true }
			);
			localStorage.setItem("token", response.data.token);
			console.log("用户类型:", response.data.user.type);
			console.log("用户类型1:", response.data.token);
			if (response.data.user.type === "admin") {
				navigate("/Homeadmin");
			} else {
				navigate("/");
			}
		} catch (err) {
			setError("wrong password");
		}
	};

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const buttonStyle = {
		position: "fixed", // Use "fixed" for always visible
		top: "22px", // Distance from top
		left: "30px", // Distance from left
		backgroundColor: "#007bff",
		border: "none",
		color: "white",
		padding: "10px 20px",
		fontSize: "20px",
		cursor: "pointer",
		transition: "background-color 0.3s ease",
		// clip-path 以一個多邊形定義按鈕形狀：這個多邊形會產生一個向左的箭頭形狀
		clipPath: "polygon(0% 50%, 85% 0%, 100% 50%, 85% 100%)",
	};


  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { name, password },{withCredentials:true});
      localStorage.setItem('token', response.data.token);
    
        navigate('/');
      
      
    
    } catch (err) {
      setError('wrong password');
    }
  };

	return (
		<div style={{ minHeight: "100vh", backgroundColor: "#fffdefd6" }}>

			<div>
				<button
					type="button"
					onClick={() => navigate("/")}
					style={buttonStyle}
				>
					← Home
				</button>
			</div>



			<div
				style={{
					backgroundImage: `url('/assets/img/loginpage/loginPageBg.png')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "20px",
				}}
			>
				<div>
					<button
						type="button"
						onClick={() => navigate("/")}
						style={buttonStyle}
					>
						← Home
					</button>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-6 col-12 mb-4">
							<div
								className="login-container"
								style={{
									padding: "30px",
									background: "white",
									borderRadius: "12px",
									boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
								}}
							>
								<h3
									className="text-center mb-4"
									style={{ color: "#333", fontWeight: 600 }}
								>
									Login
								</h3>
								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<label
											htmlFor="username"
											className="form-label"
										>
											Username:
										</label>
										<input
											type="text"
											id="username"
											className="form-control"
											value={name}
											onChange={(e) =>
												setname(e.target.value)
											}
											required
											style={{
												padding: "12px",
												borderRadius: "8px",
												border: "1px solid #ddd",
											}}
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="password"
											className="form-label"
										>
											Password:
										</label>
										<div className="d-flex align-items-center">
											<input
												type={
													showPassword
														? "text"
														: "password"
												}
												id="password"
												className="form-control flex-grow-1 me-2"
												value={password}
												onChange={(e) =>
													setPassword(e.target.value)
												}
												style={{
													padding: "12px",
													borderRadius: "8px",
													border: "1px solid #ddd",
												}}
											/>
											<i
												className={`bi ${
													showPassword
														? "bi-eye"
														: "bi-eye-slash"
												} password-toggle`}
												onClick={togglePassword}
												title="Show/Hide Password"
												style={{
													cursor: "pointer",
													fontSize: "1.2rem",
													color: "#555",
												}}
											></i>
										</div>
									</div>
									<div className="mb-3 form-check">
										<input
											type="checkbox"
											id="rememberMe"
											className="form-check-input"
										/>
										<label
											htmlFor="rememberMe"
											className="form-check-label"
										>
											Remember Me
										</label>
									</div>
									{error && (
										<div
											className="error-message"
											style={{
												color: "red",
												textAlign: "center",
												marginBottom: "10px",
											}}
										>
											{error}
										</div>
									)}
									<button
										type="submit"
										className="btn btn-primary w-100"
										style={{
											backgroundColor: "#FFD700",
											border: "none",
											borderRadius: "40px",
											padding: "12px",
											fontSize: "16px",
											fontWeight: 500,
											transition:
												"background-color 0.3s ease",
										}}
									>
										Login
									</button>
									<div className="extra-links mt-3 d-flex justify-content-between">
										<a
											href="#"
											className="text-link"
											style={{
												fontSize: "14px",
												color: "#007bff",
												textDecoration: "none",
											}}
										>
											Forgot Password?
										</a>
										<a
											href="#"
											className="text-link"
											style={{
												fontSize: "14px",
												color: "#007bff",
												textDecoration: "none",
											}}
										>
											Sign Up
										</a>
									</div>
								</form>
							</div>
						</div>

						<div className="col-lg-6 col-md-6 col-12">
							<div
								className="about-container"
								style={{
									padding: "30px",
									background: "white",
									borderRadius: "12px",
									boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
								}}
							>
								<h3
									className="text-center mb-4"
									style={{ color: "#333", fontWeight: 600 }}
								>
									Why Choose Us?
								</h3>
								<div className="row">
									<div className="col-md-6 mb-3">
										<div className="card border-0 shadow-sm h-100">
											<div className="card-body">
												<div className="d-flex align-items-center mb-2">
													<i className="bi bi-gem fs-3 text-warning me-2"></i>
													<h5 className="card-title mb-0">
														Exquisite Craftsmanship
													</h5>
												</div>
												<p>
													Our jewelry pieces are
													crafted with precision and
													passion, ensuring every item
													is a masterpiece.
												</p>
											</div>
										</div>
									</div>
									<div className="col-md-6 mb-3">
										<div className="card border-0 shadow-sm h-100">
											<div className="card-body">
												<div className="d-flex align-items-center mb-2">
													<i className="bi bi-shield-check fs-3 text-success me-2"></i>
													<h5 className="card-title mb-0">
														Unmatched Quality
													</h5>
												</div>
												<p>
													We use only the finest
													materials, ensuring
													durability and brilliance in
													every piece.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-md-12">
										<div className="card border-0 shadow-sm h-100">
											<div className="card-body text-center">
												<i className="bi bi-globe fs-3 text-secondary"></i>
												<h5>Community Impact</h5>
												<p>
													By shopping with us, you're
													supporting local artisans
													and contributing to the
													growth of our community.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
