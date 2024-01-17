// hooks/useUpdateNameSurname.js
import { useState } from "react";
import useAuthToken from "./useAuthToken";

const API_URL = "http://localhost:8080/api";

const useUpdateNameSurname = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useAuthToken();

	const updateNameSurname = async (userId, name, surname) => {
		setLoading(true);
		try {
			const response = await fetch(`${API_URL}/users/${userId}/updateName`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, surname }),
			});

			if (!response.ok) {
				throw new Error("Failed to update name and surname");
			}

			// Handle response
		} catch (err) {
			setError(err.message || "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	return { updateNameSurname, loading, error };
};

export default useUpdateNameSurname;
