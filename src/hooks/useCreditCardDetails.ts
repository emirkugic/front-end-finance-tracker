import { useState, useEffect } from "react";
import useAuthToken from "./useAuthToken";
import { API_URL } from "../constants";

const useCreditCardDetails = (userId) => {
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useAuthToken();

	useEffect(() => {
		const fetchCards = async () => {
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
					throw new Error("Failed to fetch credit card details");
				}

				const data = await response.json();
				setCards(data);
			} catch (err) {
				setError(err.message || "Unknown error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchCards();
	}, [userId, token]);

	return { cards, loading, error };
};

export default useCreditCardDetails;
