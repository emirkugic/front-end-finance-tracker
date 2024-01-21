import { useState } from "react";
import useAuthToken from "./useAuthToken";

import { API_URL } from "../constants";

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
		} catch (err) {
			setError(err.message || "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	return { updateNameSurname, loading, error };
};

export default useUpdateNameSurname;
