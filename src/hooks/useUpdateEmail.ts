// hooks/useUpdateEmail.js
import { useState } from "react";
import useAuthToken from "./useAuthToken";

const API_URL = "http://localhost:8080/api";

const useUpdateEmail = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useAuthToken();

	const updateEmail = async (userId, email) => {
		setLoading(true);
		try {
			const response = await fetch(`${API_URL}/users/${userId}/email`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(email),
			});

			if (!response.ok) {
				throw new Error("Failed to update email");
			}

			// Handle response
		} catch (err) {
			setError(err.message || "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	return { updateEmail, loading, error };
};

export default useUpdateEmail;
