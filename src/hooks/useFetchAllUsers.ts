import { useState, useEffect } from "react";
import { API_URL } from "../constants";
import useAuthToken from "./useAuthToken";

const useFetchAllUsers = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useAuthToken();

	useEffect(() => {
		const fetchUsers = async () => {
			if (!token) return;

			setLoading(true);
			try {
				const response = await fetch(`${API_URL}/users`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Error fetching user data");
				}

				const data = await response.json();
				setUsers(data);
			} catch (err) {
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [token]);

	return { users, loading, error };
};

export default useFetchAllUsers;
