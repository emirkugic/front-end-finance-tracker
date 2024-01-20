import React, { useState } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from "@mui/material";
import ResetPasswordInputModal from "./ResetPasswordInputModal";

interface ResetPasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [isInputModalOpen, setInputModalOpen] = useState(false);

	const openInputModal = () => {
		setInputModalOpen(true);
		onClose();
	};

	const closeInputModal = () => setInputModalOpen(false);

	return (
		<>
			<Dialog open={isOpen} onClose={onClose}>
				<DialogTitle>Reset Password</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to reset your password?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary">
						Cancel
					</Button>
					<Button onClick={openInputModal} color="primary" autoFocus>
						Yes, reset
					</Button>
				</DialogActions>
			</Dialog>
			<ResetPasswordInputModal
				isOpen={isInputModalOpen}
				onClose={closeInputModal}
			/>
		</>
	);
};

export default ResetPasswordModal;
