import React from "react";
import { Navigate } from "react-router-dom";
import useAuthToken from "./hooks/useAuthToken";

const ProtectedRoute = ({ children }) => {
	const token = useAuthToken();

	if (!token) {
		console.log("You need to sign in to access this route");
		return <Navigate to="/" />;
	}

	return children;
};

export default ProtectedRoute;
