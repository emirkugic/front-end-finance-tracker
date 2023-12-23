import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { API_URL } from "../../../../constants";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

type ExpenseData = {
	id: string;
	userId: string;
	amount: number;
	category: string;
	source: string;
	expenseDate: string;
	recipientChildId: string | null;
	transferToChild: boolean;
};

type ExpenseDataGroupByKeys = "category" | "source";

interface ExpensesGraphProps {
	userId: string;
	startDate: string;
	endDate: string;
	groupBy: ExpenseDataGroupByKeys;
}

interface GroupedData {
	[key: string]: number;
}

const ExpensesGraph: React.FC<ExpensesGraphProps> = ({
	userId,
	startDate,
	endDate,
	groupBy,
}) => {
	const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
	const [loading, setLoading] = useState(true);
	const theme = useTheme();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/expenses/getBetweenDates`,
					{
						params: { userId, startDate, endDate },
					}
				);
				setExpenseData(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching expense data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [userId, startDate, endDate]);

	const groupedData = expenseData.reduce(
		(acc: GroupedData, curr: ExpenseData) => {
			const key = curr[groupBy] as string;
			acc[key] = (acc[key] || 0) + curr.amount;
			return acc;
		},
		{} as GroupedData
	);

	const chartData = {
		labels: Object.keys(groupedData),
		datasets: [
			{
				label: "Total Expenses",
				data: Object.values(groupedData),
				backgroundColor: theme.palette.secondary.main,
				borderColor: theme.palette.secondary.dark,
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: "Expense Graph",
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
	};

	if (loading) {
		return <CircularProgress />;
	}

	return (
		<Box sx={{ width: "100%", height: "500px", mt: 4 }}>
			<Bar options={options} data={chartData} />
		</Box>
	);
};

export default ExpensesGraph;
