import { useState } from "react";
import axios from "axios";
import {
	Box,
	TextField,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Fab,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { API_URL } from "../constants";
import { user_id } from "../constants";

const CreateExpenseModal = ({ onClose }) => {
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState("Food");
	const [source, setSource] = useState("");
	const [expenseDate, setExpenseDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const expenseData = {
			userId: user_id,
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
			console.error("Error posting expense data:", error);
		}
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
						<TextField
							margin="normal"
							required
							fullWidth
							label="Source"
							value={source}
							onChange={(e) => setSource(e.target.value)}
						/>
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
