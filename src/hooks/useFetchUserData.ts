import { useState, useEffect } from "react";
import useAuthToken from "./useAuthToken";
import { API_URL } from "../constants";

const useFetchUserData = (userId) => {
	const [userData, setUserData] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false); // Added state for admin check
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const token = useAuthToken();

	useEffect(() => {
		const getUserData = async () => {
			if (!token || !userId) return;

			setLoading(true);
			try {
				const response = await fetch(`${API_URL}/users/${userId}`, {
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
				setUserData(data);

				const userIsAdmin =
					data.userType === "ADMIN" ||
					data.authorities?.some((auth) => auth.authority === "ADMIN");
				setIsAdmin(userIsAdmin);
			} catch (err) {
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		getUserData();
	}, [token, userId]);

	return { userData, isAdmin, loading, error };
};

export default useFetchUserData;
