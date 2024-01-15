import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants"; // Replace with your actual import path
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
	TextField,
} from "@mui/material";

type IncomeData = {
	id: string;
	userId: string;
	amount: number;
	source: string;
	receivedThrough: string;
	from: string;
	receivedDate: string;
};

interface IncomesListProps {
	userId: string;
	startDate: string;
	endDate: string;
}

const IncomesList: React.FC<IncomesListProps> = ({
	userId,
	startDate: propsStartDate,
	endDate: propsEndDate,
}) => {
	const [incomes, setIncomes] = useState<IncomeData[]>([]);
	const [sortedIncomes, setSortedIncomes] = useState<IncomeData[]>([]);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [selectedSource, setSelectedSource] = useState<string>("");
	const [selectedPaymentType, setSelectedPaymentType] = useState<string>("");
	const [selectedFrom, setSelectedFrom] = useState<string>("");
	const [startDate, setStartDate] = useState<string>(
		propsStartDate || "1990-01-01"
	);
	const [endDate, setEndDate] = useState<string>(propsEndDate || "2100-01-01");
	const [paymentTypes, setPaymentTypes] = useState<string[]>([]);
	const [sources, setSources] = useState<string[]>([]);
	const [fromList, setFromList] = useState<string[]>([]);

	useEffect(() => {
		const fetchIncomes = async () => {
			try {
				const response = await axios.get(`${API_URL}/incomes/getBetweenDates`, {
					params: { userId, startDate, endDate },
				});
				const incomesData: IncomeData[] = response.data;

				const incomesWithCardNames = await Promise.all(
					incomesData.map(async (income) => {
						if (!income.receivedThrough.toLowerCase().includes("cash")) {
							try {
								const cardNameResponse = await axios.get(
									`${API_URL}/credit-cards/getCardName/${income.receivedThrough}`
								);
								income.receivedThrough =
									cardNameResponse.data || "Unknown Card";
							} catch (error) {
								console.error("Error fetching card name:", error);
								income.receivedThrough = "Unknown Card";
							}
						}
						return income;
					})
				);

				setIncomes(incomesWithCardNames);
				setSortedIncomes(incomesWithCardNames);
				setPaymentTypes(
					Array.from(
						new Set(incomesWithCardNames.map((i) => i.receivedThrough))
					)
				);
				setSources(
					Array.from(new Set(incomesWithCardNames.map((i) => i.source)))
				);
				setFromList(
					Array.from(new Set(incomesWithCardNames.map((i) => i.from)))
				);
			} catch (error) {
				console.error("Error fetching incomes:", error);
			}
		};

		fetchIncomes();
	}, [userId, startDate, endDate]);

	useEffect(() => {
		sortIncomes();
	}, [sortOrder, incomes]);

	const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`;

	const formatDate = (dateString: string): string =>
		new Date(dateString).toLocaleDateString();

	const totalAmount = sortedIncomes.reduce(
		(sum, record) => sum + record.amount,
		0
	);

	const sortIncomes = () => {
		const sorted = [...incomes].sort((a, b) => {
			if (sortOrder === "asc") {
				return a.amount - b.amount;
			} else {
				return b.amount - a.amount;
			}
		});

		setSortedIncomes(sorted);
	};

	const handleSortOrderChange = (order: "asc" | "desc") => {
		setSortOrder(order);
	};

	const handleSourceFilterChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		const source = event.target.value as string;
		setSelectedSource(source);
		if (source) {
			setSortedIncomes(incomes.filter((income) => income.source === source));
		} else {
			setSortedIncomes(incomes); // reset to all incomes
		}
	};

	const handlePaymentTypeFilterChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		const paymentType = event.target.value as string;
		setSelectedPaymentType(paymentType);
		if (paymentType === "Cash") {
			setSortedIncomes(
				incomes.filter((income) =>
					income.receivedThrough.toLowerCase().includes("cash")
				)
			);
		} else if (paymentType) {
			setSortedIncomes(
				incomes.filter((income) => income.receivedThrough === paymentType)
			);
		} else {
			setSortedIncomes(incomes); // reset to all incomes
		}
	};

	const handleFromFilterChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		const from = event.target.value as string;
		setSelectedFrom(from);
		if (from) {
			setSortedIncomes(incomes.filter((income) => income.from === from));
		} else {
			setSortedIncomes(incomes); // reset to all incomes
		}
	};

	const rowHeight = 48;
	const containerHeight = rowHeight * 10;

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
				<FormControl sx={{ minWidth: 120 }}>
					<InputLabel id="source-filter-label">Source</InputLabel>
					<Select
						labelId="source-filter-label"
						id="source-filter"
						value={selectedSource}
						label="Source"
						onChange={handleSourceFilterChange}
					>
						<MenuItem value="">
							<em>All</em>
						</MenuItem>
						{sources.map((source) => (
							<MenuItem key={source} value={source}>
								{source}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl sx={{ minWidth: 120, mx: 2 }}>
					<InputLabel id="payment-type-filter-label">Payment Type</InputLabel>
					<Select
						labelId="payment-type-filter-label"
						id="payment-type-filter"
						value={selectedPaymentType}
						label="Payment Type"
						onChange={handlePaymentTypeFilterChange}
					>
						<MenuItem value="">
							<em>All</em>
						</MenuItem>
						<MenuItem value="Cash">Cash</MenuItem>
						{paymentTypes
							.filter((type) => type !== "Cash")
							.map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
					</Select>
				</FormControl>
				<FormControl sx={{ minWidth: 120, mx: 2 }}>
					<InputLabel id="from-filter-label">From</InputLabel>
					<Select
						labelId="from-filter-label"
						id="from-filter"
						value={selectedFrom}
						label="From"
						onChange={handleFromFilterChange}
					>
						<MenuItem value="">
							<em>All</em>
						</MenuItem>
						{fromList.map((from) => (
							<MenuItem key={from} value={from}>
								{from}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					label="Start Date"
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					InputLabelProps={{ shrink: true }}
					sx={{ mr: 1 }}
				/>
				<TextField
					label="End Date"
					type="date"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					InputLabelProps={{ shrink: true }}
				/>
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
					aria-label="incomes table"
				>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Source</TableCell>
							<TableCell>Received Through</TableCell>
							<TableCell>From</TableCell>
							<TableCell align="right">Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedIncomes.map((income) => (
							<TableRow key={income.id}>
								<TableCell>{formatDate(income.receivedDate)}</TableCell>
								<TableCell>{income.source}</TableCell>
								<TableCell>{income.receivedThrough}</TableCell>
								<TableCell>{income.from}</TableCell>
								<TableCell align="right">
									{formatCurrency(income.amount)}
								</TableCell>
							</TableRow>
						))}
						{sortedIncomes.length < 10 &&
							[...Array(10 - sortedIncomes.length)].map((_, index) => (
								<TableRow key={`empty-${index}`}>
									<TableCell component="th" scope="row">
										&nbsp;
									</TableCell>
									<TableCell>&nbsp;</TableCell>
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

export default IncomesList;
