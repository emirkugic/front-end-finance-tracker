import { useState, useEffect } from "react";
import useAuthToken from "./useAuthToken"; // Import your authentication token hook
import { API_URL } from "../constants";

const useCreditCardBalances = (userId) => {
	const [balances, setBalances] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useAuthToken();

	useEffect(() => {
		const fetchBalances = async () => {
			if (!userId || !token) return;

			setLoading(true);
			try {
				const response = await fetch(
					`${API_URL}/credit-cards/${userId}/total-cards-balances`,
					{
						method: "GET",
						headers: {
							accept: "*/*",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch credit card balances");
				}

				const data = await response.json();
				setBalances(data);
			} catch (err) {
				setError(err.message || "Unknown error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchBalances();
	}, [userId, token]);

	return { balances, loading, error };
};

export default useCreditCardBalances;
