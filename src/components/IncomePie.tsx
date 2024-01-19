/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ExpensesPieGraph/ExpensesPieGraph.module.css";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartOptions } from "chart.js";
import useFetchIncomeData from "../hooks/useFetchIncomeData";
import { API_URL } from "../constants";

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

interface PieIncomeProps {
	userId: string;
	startDate: string;
	endDate: string;
	groupBy: "from" | "receivedThrough" | "source";
}

interface ChartData {
	labels: string[];
	datasets: Array<{
		data: number[];
		backgroundColor: string[];
	}>;
}

interface IncomeData {
	date: string;
	source: string;
	receivedThrough: string;
	from: string;
	amount: number;
}

const PieIncome: React.FC<PieIncomeProps> = ({
	userId,
	startDate,
	endDate,
	groupBy,
}) => {
	const [chartData, setChartData] = useState<ChartData>({
		labels: [],
		datasets: [],
	});

	const incomeData = useFetchIncomeData(userId, startDate, endDate);

	const capitalizeFirstLetter = (string: string): string => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const generateBrightColor = (): string => {
		const hue = Math.floor(Math.random() * 360);
		const saturation = 80 + Math.random() * 20;
		const lightness = 50 + Math.random() * 10;
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	};

	const fetchCardNames = async (incomes: IncomeData[]) => {
		return await Promise.all(
			incomes.map(async (income) => {
				if (income.receivedThrough.toLowerCase() === "cash") {
					return "Cash";
				} else {
					try {
						const response = await axios.get(
							`${API_URL}/credit-cards/getCardName/${income.receivedThrough}`
						);
						return response.data || "Unknown Card";
					} catch (error) {
						console.error("Error fetching card name:", error);
						return "Unknown Card";
					}
				}
			})
		);
	};

	const processData = (
		incomes: IncomeData[],
		param: string,
		cardNames: string[]
	) => {
		let processedData: Record<string, number> = {};
		incomes.forEach((income, index) => {
			const key =
				param === "receivedThrough" ? cardNames[index] : income[param];
			const amount = income.amount;
			if (key) {
				let formattedKey = capitalizeFirstLetter(key.toString().toLowerCase());
				processedData[formattedKey] =
					(processedData[formattedKey] || 0) + amount;
			}
		});
		return processedData;
	};

	useEffect(() => {
		const prepareChartData = async () => {
			if (incomeData.length > 0) {
				const cardNames = await fetchCardNames(incomeData);
				const processedData = processData(incomeData, groupBy, cardNames);
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
			}
		};

		prepareChartData();
	}, [incomeData, groupBy]);

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

export default PieIncome;
