// Login2 component
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/authSlice";
import {
	Box,
	Button,
	TextField,
	Typography,
	Divider,
	Container,
	Paper,
	Grid,
	IconButton,
	InputAdornment,
	Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthToken from "../store/useAuthToken"; // Import the custom hook

const Login2: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authState = useSelector((state) => state.auth);
	const token = useAuthToken();

	useEffect(() => {
		if (authState.userToken) {
			localStorage.setItem("jwtToken", authState.userToken);
			setSnackbarMessage("Login successful!");
			setSnackbarOpen(true);
			navigate("/profile");
			console.log("Login2 component");
			console.log("JWT Token:", token); // Log the JWT token
		}
		if (authState.success) {
			setSnackbarMessage("Registration successful!");
			setSnackbarOpen(true);
			setIsRegistering(false);
		}
		if (authState.error) {
			setSnackbarMessage(authState.error);
			setSnackbarOpen(true);
		}
	}, [authState, navigate, token]);

	const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(loginUser({ email, password }));
	};

	const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(registerUser({ firstName, lastName, email, password }));
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					my: 4,
				}}
			>
				<Paper
					elevation={3}
					sx={{
						p: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
						bgcolor: "background.default",
					}}
				>
					{!isRegistering ? (
						<form onSubmit={handleLoginSubmit}>
							<Typography variant="h5" sx={{ mb: 2 }}>
								Login
							</Typography>
							<TextField
								fullWidth
								label="Email"
								type="email"
								margin="normal"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								fullWidth
								label="Password"
								type={showPassword ? "text" : "password"}
								margin="normal"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => setShowPassword(!showPassword)}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
								Login
							</Button>
							<Divider sx={{ my: 2 }} />
							<Button onClick={() => setIsRegistering(true)} size="large">
								Need an account? Register
							</Button>
							<Typography variant="body2" sx={{ mt: 2, cursor: "pointer" }}>
								Forgot Password?
							</Typography>
						</form>
					) : (
						<form onSubmit={handleRegisterSubmit}>
							<Typography variant="h5" sx={{ mb: 2 }}>
								Register
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Name"
										margin="normal"
										required
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										label="Surname"
										margin="normal"
										required
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</Grid>
							</Grid>
							<TextField
								fullWidth
								label="Email"
								type="email"
								margin="normal"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								fullWidth
								label="Password"
								type={showPassword ? "text" : "password"}
								margin="normal"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => setShowPassword(!showPassword)}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
								Register
							</Button>
							<Divider sx={{ my: 2 }} />
							<Button onClick={() => setIsRegistering(false)} size="small">
								Already have an account? Login
							</Button>
						</form>
					)}
				</Paper>
			</Box>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				message={snackbarMessage}
			/>
		</Container>
	);
};

export default Login2;
