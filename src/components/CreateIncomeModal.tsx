import { useEffect, useState } from "react";
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
import useAuthToken from "../hooks/useAuthToken";

const CreateIncomeModal = ({ onClose }) => {
	const [amount, setAmount] = useState(0);
	const [source, setSource] = useState("");
	const [receivedThrough, setReceivedThrough] = useState("");
	const [from, setFrom] = useState("");
	const [receivedDate, setReceivedDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		onClose();
	};

	const token = useAuthToken();
	const [userId, setUserId] = useState("");

	useEffect(() => {
		if (token) {
			const tokenPayload = JSON.parse(atob(token.split(".")[1]));
			setUserId(tokenPayload.userId);
		}
	}, [token]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const incomeData = {
			userId: userId,
			amount,
			source,
			receivedThrough,
			from,
			receivedDate: receivedDate.toISOString(),
		};
		try {
			const response = await axios.post(`${API_URL}/incomes`, incomeData);
			console.log(response.data);
			handleClose();
		} catch (error) {
			console.log("Error posting income data:", error);
		}
	};

	return (
		<div div style={{ position: "fixed", bottom: "16px", right: "16px" }}>
			<Fab color="primary" aria-label="add" onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Income</DialogTitle>
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
							label="Source"
							value={source}
							onChange={(e) => setSource(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Received Through"
							value={receivedThrough}
							onChange={(e) => setReceivedThrough(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="From"
							value={from}
							onChange={(e) => setFrom(e.target.value)}
						/>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								label="Received Date"
								value={receivedDate}
								onChange={setReceivedDate}
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

export default CreateIncomeModal;
