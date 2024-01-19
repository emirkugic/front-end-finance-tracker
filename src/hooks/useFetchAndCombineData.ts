import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";

type TransactionType = "income" | "expense";

type CombinedData = {
	date: string;
	categoryOrSource: string;
	accountOrReceivedThrough: string;
	amount: number;
	type: TransactionType;
};

const useFetchAndCombineData = (
	userId: string,
	startDate: string,
	endDate: string
) => {
	const [combinedData, setCombinedData] = useState<CombinedData[]>([]);

	useEffect(() => {
		const fetchAndCombine = async () => {
			try {
				const [expensesResponse, incomesResponse] = await Promise.all([
					axios.get(`${API_URL}/expenses/getBetweenDates`, {
						params: { userId, startDate, endDate },
					}),
					axios.get(`${API_URL}/incomes/getBetweenDates`, {
						params: { userId, startDate, endDate },
					}),
				]);

				const transformedExpenses = expensesResponse.data.map((expense) => ({
					date: expense.expenseDate,
					categoryOrSource: expense.category,
					accountOrReceivedThrough: expense.source,
					amount: -expense.amount,
					type: "expense" as TransactionType,
				}));

				const transformedIncomes = incomesResponse.data.map((income) => ({
					date: income.receivedDate,
					categoryOrSource: income.source,
					accountOrReceivedThrough: income.receivedThrough,
					amount: income.amount,
					type: "income" as TransactionType,
				}));

				// combine and sorts by date
				const combined = [...transformedExpenses, ...transformedIncomes].sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
				);

				setCombinedData(combined);
			} catch (error) {
				console.error("Error fetching and combining data:", error);
			}
		};

		fetchAndCombine();
	}, [userId, startDate, endDate]);

	return combinedData;
};

export default useFetchAndCombineData;