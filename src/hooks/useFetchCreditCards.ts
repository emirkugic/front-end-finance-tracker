import { useState, useEffect } from "react";
import useAuthToken from "./useAuthToken";
import { API_URL } from "../constants";

const useFetchCreditCards = (userId) => {
	const [creditCards, setCreditCards] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useAuthToken();

	useEffect(() => {
		const fetchCreditCards = async () => {
			if (!userId || !token) return;

			setLoading(true);
			try {
				const response = await fetch(`${API_URL}/credit-cards/user/${userId}`, {
					method: "GET",
					headers: {
						accept: "*/*",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch credit cards");
				}

				const data = await response.json();
				setCreditCards(data);
			} catch (err) {
				setError(err.message || "Unknown error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchCreditCards();
	}, [userId, token]);

	return { creditCards, loading, error };
};

export default useFetchCreditCards;
