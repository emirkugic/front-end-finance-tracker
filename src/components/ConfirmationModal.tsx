import React from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from "@mui/material";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogTitle>Delete account</DialogTitle>
			<DialogContent>
				<DialogContentText>Are you sure?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onConfirm} color="primary" autoFocus>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationModal;
