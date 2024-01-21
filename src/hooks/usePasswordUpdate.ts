import { useState } from "react";
import { API_URL } from "../constants";
import useAuthToken from "./useAuthToken";

const usePasswordUpdate = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const token = useAuthToken();

	const updatePassword = async (userId, oldPassword, newPassword) => {
		setIsLoading(true);
		setError(null);
		setIsSuccess(false);

		const payload = {
			userId,
			oldPassword,
			newPassword,
		};

		try {
			const response = await fetch(`${API_URL}/users/password/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to update password");
			}

			setIsSuccess(true);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { updatePassword, isLoading, error, isSuccess };
};

export default usePasswordUpdate;
