import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Box,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";

type ExpenseData = {
	id: string;
	userId: string;
	amount: number;
	category: string;
	source: string;
	expenseDate: string;
};

interface ExpensesListProps {
	userId: string;
	startDate: string;
	endDate: string;
}

const ExpensesList: React.FC<ExpensesListProps> = ({
	userId,
	startDate,
	endDate,
}) => {
	const [expenses, setExpenses] = useState<ExpenseData[]>([]);
	const [sortedExpenses, setSortedExpenses] = useState<ExpenseData[]>([]);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [selectedCategory, setSelectedCategory] = useState<string>("");

	useEffect(() => {
		const fetchExpenses = async () => {
			const response = await axios.get(
				"http://localhost:8080/api/expenses/getBetweenDates",
				{
					params: { userId, startDate, endDate },
				}
			);
			setExpenses(response.data);
			setSortedExpenses(response.data); // Initialize with fetched data
		};

		fetchExpenses();
	}, [userId, startDate, endDate]);

	useEffect(() => {
		sortExpenses();
	}, [sortOrder, expenses]);

	const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`;

	const formatDate = (dateString: string): string =>
		new Date(dateString).toLocaleDateString();

	const totalAmount = expenses.reduce((sum, record) => sum + record.amount, 0);

	const sortExpenses = () => {
		const sorted = [...expenses].sort((a, b) => {
			if (sortOrder === "asc") {
				return a.amount - b.amount;
			} else {
				return b.amount - a.amount;
			}
		});

		setSortedExpenses(sorted);
	};

	const handleSortOrderChange = (order: "asc" | "desc") => {
		setSortOrder(order);
	};

	const handleCategoryFilterChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		const category = event.target.value as string;
		setSelectedCategory(category);
		if (category) {
			setSortedExpenses(
				expenses.filter((expense) => expense.category === category)
			);
		} else {
			setSortedExpenses(expenses); // reset to all expenses
		}
	};

	const rowHeight = 48;
	const containerHeight = rowHeight * 10;

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
				<FormControl sx={{ minWidth: 120 }}>
					<InputLabel id="category-filter-label">Category</InputLabel>
					<Select
						labelId="category-filter-label"
						id="category-filter"
						value={selectedCategory}
						label="Category"
						onChange={handleCategoryFilterChange}
					>
						<MenuItem value="">
							<em>All</em>
						</MenuItem>
						{Array.from(
							new Set(expenses.map((expense) => expense.category))
						).map((category) => (
							<MenuItem key={category} value={category}>
								{category}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Box>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => handleSortOrderChange("asc")}
						sx={{ mr: 1 }}
					>
						Sort Asc
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => handleSortOrderChange("desc")}
					>
						Sort Desc
					</Button>
				</Box>
			</Box>
			<TableContainer
				component={Paper}
				elevation={4}
				sx={{
					maxHeight: containerHeight,
					overflow: "auto",
					"::-webkit-scrollbar": { display: "none" },
					msOverflowStyle: "none", // IE and Edge
					scrollbarWidth: "none", // Firefox
				}}
			>
				<Table
					stickyHeader
					sx={{
						minWidth: 650,
						"tr:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
						"tr:nth-of-type(even)": { backgroundColor: "#e9e9e9" },
						"& tbody tr": { height: rowHeight },
					}}
					aria-label="expenses table"
				>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Account</TableCell>
							<TableCell align="right">Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedExpenses.map((expense) => (
							<TableRow key={expense.id}>
								<TableCell>{formatDate(expense.expenseDate)}</TableCell>
								<TableCell>{expense.category}</TableCell>
								<TableCell>{expense.source}</TableCell>
								<TableCell align="right">
									{formatCurrency(expense.amount)}
								</TableCell>
							</TableRow>
						))}
						{sortedExpenses.length < 10 && // Fill empty rows to ensure the table size is always for 10 rows
							[...Array(10 - sortedExpenses.length)].map((_, index) => (
								<TableRow key={`empty-${index}`}>
									<TableCell component="th" scope="row">
										&nbsp;
									</TableCell>
									<TableCell>&nbsp;</TableCell>
									<TableCell>&nbsp;</TableCell>
									<TableCell align="right">&nbsp;</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
				<Typography variant="subtitle1">
					Total: {formatCurrency(totalAmount)}
				</Typography>
			</Box>
		</Box>
	);
};

export default ExpensesList;
