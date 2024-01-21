import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import useAuthToken from "./useAuthToken";

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
	const token = useAuthToken();

	useEffect(() => {
		const fetchAndCombine = async () => {
			try {
				const [expensesResponse, incomesResponse] = await Promise.all([
					axios.get(`${API_URL}/expenses/getBetweenDates`, {
						params: { userId, startDate, endDate },
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}),
					axios.get(`${API_URL}/incomes/getBetweenDates`, {
						params: { userId, startDate, endDate },
						headers: {
							Authorization: `Bearer ${token}`,
						},
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

				const combined = [...transformedExpenses, ...transformedIncomes].sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
				);

				setCombinedData(combined);
			} catch (error) {
				console.log("Error fetching and combining data:", error);
			}
		};

		fetchAndCombine();
	}, [userId, startDate, endDate, token]);

	return combinedData;
};

export default useFetchAndCombineData;
