import { useState } from "react";
import { API_URL } from "../constants";

const useDeleteUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const deleteUser = async (userId) => {
		setIsLoading(true);
		setError(null);
		setIsSuccess(false);

		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${API_URL}/users/${userId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorData = await response.text();
				throw new Error(errorData || "Failed to delete user");
			}

			setIsSuccess(true);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { deleteUser, isLoading, error, isSuccess };
};

export default useDeleteUser;
