// useAuthToken.js
import { useState, useEffect } from "react";

const useAuthToken = () => {
	const [token, setToken] = useState("");

	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");
		if (jwtToken) {
			setToken(jwtToken);
		}
	}, []);

	return token;
};

export default useAuthToken;
