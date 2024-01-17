import { useState } from "react";
import { API_URL } from "../constants"; // Adjust the import path as needed
import useAuthToken from "./useAuthToken"; // Import the hook you've used for authorization

const useCreateCard = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useAuthToken();

	const createCard = async ({
		userId,
		cardName,
		cardNumber,
		expiryDate,
		balance,
	}) => {
		setLoading(true);
		try {
			const response = await fetch(`${API_URL}/credit-cards/creditcard`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					userId,
					cardName,
					cardNumber,
					expiryDate,
					balance,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create the card");
			}

			const data = await response.json();
			console.log(data); // For debug purposes
		} catch (err) {
			setError(err.message || "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	};

	return { createCard, loading, error };
};

export default useCreateCard;
