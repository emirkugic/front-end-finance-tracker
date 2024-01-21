import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Box,
	TextField,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Fab,
	Select,
	MenuItem,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { API_URL } from "../constants";
import useAuthToken from "../hooks/useAuthToken";
import useFetchCreditCards from "../hooks/useFetchCreditCards"; // Make sure to import the hook

const CreateExpenseModal = ({ onClose }) => {
	// Existing state variables
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState("Food");
	const [source, setSource] = useState("Cash");
	const [expenseDate, setExpenseDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	// New state variable for userId
	const token = useAuthToken();
	const [userId, setUserId] = useState("");

	// Fetch credit cards using the custom hook
	const { creditCards, loading, error } = useFetchCreditCards(userId);

	useEffect(() => {
		if (token) {
			const tokenPayload = JSON.parse(atob(token.split(".")[1]));
			setUserId(tokenPayload.userId);
		}
	}, [token]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const expenseData = {
			userId: userId,
			amount,
			category,
			source,
			expenseDate: expenseDate.toISOString(),
		};
		try {
			const response = await axios.post(`${API_URL}/expenses`, expenseData);
			console.log(response.data);
			handleClose();
		} catch (error) {
			console.log("Error posting expense data:", error);
		}
	};

	const handleSourceChange = (event) => {
		setSource(event.target.value);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};

	return (
		<div style={{ position: "fixed", bottom: "16px", right: "16px" }}>
			<Fab color="primary" aria-label="add" onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Expense</DialogTitle>
				<DialogContent>
					<Box component="form" onSubmit={handleSubmit} noValidate>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Amount"
							type="number"
							autoFocus
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
						<Select
							label="Source"
							value={source}
							onChange={handleSourceChange}
							displayEmpty
							fullWidth
							margin="normal"
						>
							<MenuItem value="Cash">Cash</MenuItem>
							{creditCards &&
								creditCards.map((card) => (
									<MenuItem key={card.id} value={card.id}>
										{card.cardName}
									</MenuItem>
								))}
						</Select>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								label="Expense Date"
								value={expenseDate}
								onChange={setExpenseDate}
								renderInput={(params) => (
									<TextField {...params} fullWidth margin="normal" />
								)}
							/>
						</LocalizationProvider>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Submit
						</Button>
						<Button
							onClick={handleClose}
							fullWidth
							variant="outlined"
							sx={{ mt: 1, mb: 2 }}
						>
							Cancel
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateExpenseModal;
