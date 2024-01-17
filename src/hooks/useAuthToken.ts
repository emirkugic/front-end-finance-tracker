// useAuthToken.js
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

export default useAuthToken;
