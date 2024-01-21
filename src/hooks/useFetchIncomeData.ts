import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import useAuthToken from "./useAuthToken";

type IncomeData = {
	date: string;
	source: string;
	receivedThrough: string;
	from: string;
	amount: number;
};

const useFetchIncomeData = (
	userId: string,
	startDate: string,
	endDate: string
) => {
	const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
	const token = useAuthToken();

	useEffect(() => {
		const fetchIncomeData = async () => {
			try {
				const incomesResponse = await axios.get(
					`${API_URL}/incomes/getBetweenDates`,
					{
						params: { userId, startDate, endDate },
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const transformedIncomes = incomesResponse.data.map((income) => ({
					date: income.receivedDate,
					source: income.source,
					receivedThrough: income.receivedThrough,
					from: income.from,
					amount: income.amount,
				}));

				// Sort incomes by date in chronological order
				const sortedIncomes = transformedIncomes.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
				);

				setIncomeData(sortedIncomes);
			} catch (error) {
				console.log("Error fetching income data:", error);
			}
		};

		fetchIncomeData();
	}, [userId, startDate, endDate, token]);

	return incomeData;
};

export default useFetchIncomeData;
