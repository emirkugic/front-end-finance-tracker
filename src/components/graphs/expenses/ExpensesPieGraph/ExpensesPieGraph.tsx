/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ExpensesPieGraph.module.css";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartOptions } from "chart.js";
import { user_id } from "../../../../constants";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	ArcElement,
	Tooltip,
	Legend,
	ChartDataLabels
);

interface ExpensesPieGraphProps {
	startDate: string;
	endDate: string;
	parameter: string;
}

interface ChartData {
	labels: string[];
	datasets: Array<{
		data: number[];
		backgroundColor: string[];
	}>;
}

const ExpensesPieGraph: React.FC<ExpensesPieGraphProps> = ({
	startDate,
	endDate,
	parameter,
}) => {
	const [chartData, setChartData] = useState<ChartData>({
		labels: [],
		datasets: [],
	});

	const capitalizeFirstLetter = (string: string): string => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const generateBrightColor = (): string => {
		const hue = Math.floor(Math.random() * 360);
		const saturation = 80 + Math.random() * 20;
		const lightness = 50 + Math.random() * 10;
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	};

	const getCardName = async (cardId: string): Promise<string> => {
		try {
			const response = await axios.get(
				`http://localhost:8080/api/credit-cards/getCardName/${cardId}`
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching card name:", error);
			return cardId;
		}
	};

	const processExpenses = async (expenses: any[], param: string) => {
		let processedData: Record<string, number> = {};
		for (const expense of expenses) {
			const value = expense[param];
			const amount = expense.amount;
			if (value) {
				let key = value;
				if (param === "source" && value.toString().toLowerCase() !== "cash") {
					key = await getCardName(value);
				}
				key =
					value.toString().toLowerCase() === "cash"
						? "Cash"
						: capitalizeFirstLetter(key.toString().toLowerCase());
				processedData[key] = (processedData[key] || 0) + amount;
			}
		}
		return processedData;
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8080/api/expenses/getBetweenDates",
				{
					params: {
						userId: user_id,
						startDate: startDate,
						endDate: endDate,
					},
				}
			);

			const processedData = await processExpenses(
				response.data,
				parameter.toLowerCase()
			);
			setChartData({
				labels: Object.keys(processedData).map(capitalizeFirstLetter),
				datasets: [
					{
						data: Object.values(processedData),
						backgroundColor:
							Object.keys(processedData).map(generateBrightColor),
					},
				],
			});
		} catch (error) {
			console.error("Error fetching expenses data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [startDate, endDate, parameter]);

	const options: ChartOptions<"pie"> = {
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					usePointStyle: true,
					pointStyle: "rectRounded",
					padding: 20,
				},
			},
			datalabels: {
				color: "#174148",
				anchor: "center",
				textAlign: "center",
				font: {
					weight: "bold",
					size: 14,
				},
				formatter: (value: number, context: any) => {
					let sum = context.chart.data.datasets[0].data.reduce(
						(a: number, b: number) => a + b,
						0
					);
					let percentage = ((value * 100) / sum).toFixed(2) + "%";
					return percentage;
				},
				textStrokeColor: "#fff",
				textStrokeWidth: 0,
				padding: 6,
			},
		},
	};

	return (
		<div className={styles.pieGraphContainer}>
			<Pie data={chartData} options={options} />
		</div>
	);
};

export default ExpensesPieGraph;
