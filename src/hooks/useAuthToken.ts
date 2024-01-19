import { useState, useEffect } from "react";

const useAuthToken = () => {
	const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");

	useEffect(() => {
		const handleStorageChange = () => {
			setToken(localStorage.getItem("jwtToken") || "");
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	return token;
};

export const isAuthenticated = (token) => {
	return !!token; //the two "!!" is the same as => token !== null && token !== undefined && token !== ""; otherwise it will the token value instead of boolean
};

export default useAuthToken;
