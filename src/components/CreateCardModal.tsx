import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
} from "@mui/material";
import useCreateCard from "../hooks/useCreateCard";

const CreateCardModal = ({ open, onClose, userId }) => {
	const [cardName, setCardName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [balance, setBalance] = useState("");
	const { createCard } = useCreateCard();

	const handleSubmit = async () => {
		if (cardNumber.length === 4) {
			await createCard({ userId, cardName, cardNumber, expiryDate, balance });
			onClose();
		} else {
			alert("Card number must be exactly 4 digits.");
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Create New Card</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label="Bank Name"
					type="text"
					fullWidth
					variant="outlined"
					value={cardName}
					onChange={(e) => setCardName(e.target.value)}
				/>
				<TextField
					margin="dense"
					label="Last 4 Digits"
					type="number"
					fullWidth
					variant="outlined"
					inputProps={{ maxLength: 4 }}
					value={cardNumber}
					onChange={(e) => setCardNumber(e.target.value)}
				/>
				<TextField
					margin="dense"
					label="Expiry Date"
					type="text"
					fullWidth
					variant="outlined"
					placeholder="MM-YYYY"
					value={expiryDate}
					onChange={(e) => setExpiryDate(e.target.value)}
				/>
				<TextField
					margin="dense"
					label="Balance"
					type="number"
					fullWidth
					variant="outlined"
					value={balance}
					onChange={(e) => setBalance(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleSubmit}>Create Card</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreateCardModal;
