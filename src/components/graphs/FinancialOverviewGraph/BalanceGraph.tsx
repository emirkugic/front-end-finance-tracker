import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { API_URL } from "../../../constants";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

type IncomeData = {
	id: string;
	userId: string;
	amount: number;
	receivedDate: string;
};

type ExpenseData = {
	id: string;
	userId: string;
	amount: number;
	expenseDate: string;
};

interface BalanceGraphProps {
	userId: string;
	startDate: string;
	endDate: string;
}

const BalanceGraph: React.FC<BalanceGraphProps> = ({
	userId,
	startDate,
	endDate,
}) => {
	const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
	const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
	const [loading, setLoading] = useState(true);
	const theme = useTheme();

	useEffect(() => {
		const fetchIncomeData = async () => {
			const response = await axios.get(`${API_URL}/incomes/getBetweenDates`, {
				params: { userId, startDate, endDate },
			});
			setIncomeData(response.data);
		};

		const fetchExpenseData = async () => {
			const response = await axios.get(`${API_URL}/expenses/getBetweenDates`, {
				params: { userId, startDate, endDate },
			});
			setExpenseData(response.data);
		};

		setLoading(true);
		Promise.all([fetchIncomeData(), fetchExpenseData()]).then(() => {
			setLoading(false);
		});
	}, [userId, startDate, endDate]);

	const calculateBalance = () => {
		const balanceByDate = {};

		incomeData.forEach(({ amount, receivedDate }) => {
			const date = receivedDate.split("T")[0];
			balanceByDate[date] = (balanceByDate[date] || 0) + amount;
		});

		expenseData.forEach(({ amount, expenseDate }) => {
			const date = expenseDate.split("T")[0];
			balanceByDate[date] = (balanceByDate[date] || 0) - amount;
		});

		const sortedDates = Object.keys(balanceByDate).sort();
		let cumulativeBalance = 0;
		const balanceData = sortedDates.map((date) => {
			cumulativeBalance += balanceByDate[date];
			return { date, balance: cumulativeBalance };
		});

		return balanceData;
	};

	const balanceData = calculateBalance();

	const chartData = {
		labels: balanceData.map((item) => item.date),
		datasets: [
			{
				label: "Balance Over Time !! WIP NEEDS TO BE FIXED !!",
				data: balanceData.map((item) => item.balance),
				backgroundColor: theme.palette.primary.main,
				borderColor: theme.palette.primary.dark,
				borderWidth: 1,
				fill: false,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
			},
			title: {
				display: true,
				text: "Balance Over Time",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	if (loading) {
		return <CircularProgress />;
	}

	return (
		<Box sx={{ width: "100%", height: "500px", mt: 4 }}>
			<Line options={options} data={chartData} />
		</Box>
	);
};

export default BalanceGraph;
