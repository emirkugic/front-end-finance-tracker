import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { format } from "date-fns";

const ExpenseForm: React.FC = () => {
	const [amount, setAmount] = useState<number | string>("");
	const [category, setCategory] = useState<string>("");
	const [source, setSource] = useState<string>("Cash");
	const [expenseDate, setExpenseDate] = useState<string>(
		format(new Date(), "yyyy-MM-dd'T'HH:mm")
	);
	const [creditCards, setCreditCards] = useState([]);
	const [existingCategories, setExistingCategories] = useState<string[]>([]);
	const [isCategoryInput, setIsCategoryInput] = useState<boolean>(false); // State to toggle category input type

	useEffect(() => {
		// Fetch available credit cards from the API
		fetch(
			"http://localhost:8080/api/credit-cards/user/6549031fc02fd9204841b306"
		)
			.then((response) => response.json())
			.then((data) => {
				setCreditCards(data);
			})
			.catch((error) => {
				console.log("Error fetching credit cards:", error);
			});

		// Fetch existing expense categories from the API
		fetch("http://localhost:8080/api/expenses/user/6549031fc02fd9204841b306")
			.then((response) => response.json())
			.then((data) => {
				const uniqueCategories = [
					...new Set(data.map((expense) => expense.category)),
				];
				setExistingCategories(uniqueCategories);
			})
			.catch((error) => {
				console.log("Error fetching existing categories:", error);
			});
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const expenseData = {
			userId: "6549031fc02fd9204841b306",
			amount: parseFloat(amount.toString()),
			category,
			source: source === "Cash" ? "Cash" : source,
			expenseDate,
		};

		try {
			const response = await fetch("http://localhost:8080/api/expenses/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(expenseData),
			});

			if (response.ok) {
				// Handle success
			} else {
				// Handle server errors
			}
		} catch (error) {
			// Handle network or other errors
		}
	};

	const toggleCategoryInput = () => {
		setIsCategoryInput(!isCategoryInput);
	};

	return (
		<div style={{ maxWidth: "400px", margin: "0 auto" }}>
			<h2>Create Expense</h2>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Amount"
					type="number"
					required
					fullWidth
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<br />
				{isCategoryInput ? (
					<TextField
						label="Category"
						required
						fullWidth
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>
				) : (
					<TextField
						label="Category"
						required
						fullWidth
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						select
					>
						{existingCategories.map((existingCategory) => (
							<MenuItem key={existingCategory} value={existingCategory}>
								{existingCategory}
							</MenuItem>
						))}
					</TextField>
				)}
				<Button onClick={toggleCategoryInput} style={{ marginTop: "10px" }}>
					{isCategoryInput ? "Use Dropdown" : "Add New Category"}
				</Button>
				<br />
				<FormControl fullWidth style={{ marginTop: "20px" }}>
					<InputLabel>Source</InputLabel>
					<Select
						value={source}
						onChange={(e) => setSource(e.target.value as string)}
					>
						<MenuItem value="Cash">Cash</MenuItem>
						{creditCards.map((card: any) => (
							<MenuItem key={card.id} value={card.id}>
								{card.cardName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<br />
				<TextField
					label="Expense Date"
					type="datetime-local"
					required
					InputLabelProps={{ shrink: true }}
					fullWidth
					value={expenseDate}
					onChange={(e) => setExpenseDate(e.target.value)}
					style={{ marginTop: "20px" }}
				/>
				<br />
				<Button
					variant="contained"
					type="submit"
					fullWidth
					style={{ marginTop: "20px" }}
				>
					Create Expense
				</Button>
			</form>
		</div>
	);
};

export default ExpenseForm;
