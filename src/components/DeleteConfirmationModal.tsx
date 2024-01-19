import React from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from "@mui/material";

interface DeleteConfirmationModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
	open,
	onClose,
	onConfirm,
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Delete User</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete this user? This action cannot be
					undone.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onConfirm} color="error">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirmationModal;
