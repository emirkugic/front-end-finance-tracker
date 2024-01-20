import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
	Button,
} from "@mui/material";
import usePasswordUpdate from "../hooks/usePasswordUpdate";
import useAuthToken from "../hooks/useAuthToken";

interface ResetPasswordInputModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ResetPasswordInputModal: React.FC<ResetPasswordInputModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const { updatePassword, isLoading, error } = usePasswordUpdate();
	const token = useAuthToken();
	const [userId, setUserId] = useState("");

	useEffect(() => {
		if (token) {
			const tokenPayload = JSON.parse(atob(token.split(".")[1]));
			setUserId(tokenPayload.userId);
		}
	}, [token]);

	const handlePasswordChange = async () => {
		if (userId) {
			await updatePassword(userId, oldPassword, newPassword);
		}
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogContent>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<TextField
					margin="dense"
					id="old-password"
					label="Old Password"
					type="password"
					fullWidth
					variant="standard"
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
				/>
				<TextField
					margin="dense"
					id="new-password"
					label="New Password"
					type="password"
					fullWidth
					variant="standard"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					onClick={handlePasswordChange}
					color="primary"
					disabled={isLoading}
				>
					Change my password
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ResetPasswordInputModal;
