import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { API_URL } from "../constants";
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

type IncomeData = {
	id: string;
	userId: string;
	amount: number;
	source: string;
	receivedThrough: string;
	from: string;
	receivedDate: string;
};

interface IncomesGraphProps {
	userId: string;
	startDate: string;
	endDate: string;
	groupBy: "from" | "source" | "receivedThrough";
}

interface GroupedData {
	[key: string]: number;
}

const IncomesGraph: React.FC<IncomesGraphProps> = ({
	userId,
	startDate,
	endDate,
	groupBy,
}) => {
	const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const theme = useTheme();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/incomes/getBetweenDates`, {
					params: { userId, startDate, endDate },
				});
				setIncomeData(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching income data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [userId, startDate, endDate]);

	const groupedData = incomeData.reduce(
		(acc: GroupedData, curr: IncomeData) => {
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
				label: "Total Income",
				data: Object.values(groupedData),
				backgroundColor: theme.palette.primary.main,
				borderColor: theme.palette.primary.dark,
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
				text: "Income Graph",
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
		<Box sx={{ width: "900px", height: "80%", mt: 4 }}>
			<Bar options={options} data={chartData} />
		</Box>
	);
};

export default IncomesGraph;
