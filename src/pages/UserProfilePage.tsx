import { useState } from "react";
import {
	Box,
	Container,
	Typography,
	Avatar,
	Button,
	Grid,
	TextField,
	IconButton,
	Input,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ConfirmationModal from "../components/ConfirmationModal";

const UserProfilePage = () => {
	const [name, setName] = useState("Emir Kugic");
	const [email, setEmail] = useState("emir.kugic@example.com");
	const [isEditable, setEditable] = useState(false);
	const [tempName, setTempName] = useState(name);
	const [image, setImage] = useState("/url to image");
	const [isModalOpen, setModalOpen] = useState(false);
	const [isResetPasswordOpen, setResetPasswordOpen] = useState(false);

	const handleEditClick = () => {
		setEditable(true);
	};

	const handleSaveClick = () => {
		setName(tempName);
		setEditable(false);
	};

	const handleNameChange = (event) => {
		setTempName(event.target.value);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		const imageUrl = URL.createObjectURL(file);
		setImage(imageUrl);
	};

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const openResetPasswordDialog = () => {
		setResetPasswordOpen(true);
	};

	const closeResetPasswordDialog = () => {
		setResetPasswordOpen(false);
	};

	const handleResetPassword = () => {
		console.log("Password reset process initiated.");

		closeResetPasswordDialog();
	};

	const handleDeleteAccount = () => {
		console.log("Account deletion process initiated.");
		closeModal();
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			minHeight="100vh"
			style={{ color: "black" }} // Set the font color to black for the root element
		>
			<Container maxWidth="sm">
				<Avatar
					alt={name}
					src={image}
					sx={{ width: 150, height: 150, mx: "auto" }}
				/>
				{isEditable && (
					<Input
						type="file"
						onChange={handleImageChange}
						sx={{ mt: 2, width: "100%" }}
					/>
				)}
				{isEditable ? (
					<TextField
						id="outlined-name-input"
						value={tempName}
						onChange={handleNameChange}
						margin="normal"
						fullWidth
						variant="outlined"
						sx={{ color: "black" }} // Set the font color to black for this TextField
					/>
				) : (
					<Typography
						variant="h3"
						component="div"
						sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}
					>
						{name}
					</Typography>
				)}

				<Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
					{email}
				</Typography>
				<Box sx={{ my: 2, textAlign: "center" }}>
					<IconButton onClick={isEditable ? handleSaveClick : handleEditClick}>
						{isEditable ? (
							<SaveIcon color="action" />
						) : (
							<EditIcon color="action" />
						)}
					</IconButton>
				</Box>

				<Box sx={{ my: 2, textAlign: "center" }}>
					<Button
						variant="outlined"
						color="primary"
						onClick={openResetPasswordDialog}
					>
						Reset Password
					</Button>
				</Box>

				<Dialog open={isResetPasswordOpen} onClose={closeResetPasswordDialog}>
					<DialogTitle>Reset Password</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to reset your password?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeResetPasswordDialog} color="primary">
							Cancel
						</Button>
						<Button onClick={handleResetPassword} color="primary" autoFocus>
							Yes, reset
						</Button>
					</DialogActions>
				</Dialog>

				<Grid container spacing={2} justifyContent="center">
					<Grid item>
						<Button
							variant="contained"
							color="error"
							sx={{ borderRadius: "20px" }}
							onClick={openModal}
						>
							DELETE ACCOUNT
						</Button>
					</Grid>
				</Grid>

				{/* Confirmation Modal for Deleting Account */}
				<ConfirmationModal
					isOpen={isModalOpen}
					onClose={closeModal}
					onConfirm={handleDeleteAccount}
				/>
			</Container>
		</Box>
	);
};

export default UserProfilePage;
