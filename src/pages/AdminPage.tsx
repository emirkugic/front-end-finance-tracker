import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken";
import useFetchUserData from "../hooks/useFetchUserData";
import ListUsers from "../components/ListUsers";
import { jwtDecode } from "jwt-decode";

const AdminPage = () => {
	const token = useAuthToken();
	const navigate = useNavigate();
	let userId = null;

	if (token) {
		const decoded = jwtDecode(token);
		userId = decoded.userId;
	}

	const { userData } = useFetchUserData(userId);

	useEffect(() => {
		let isAdmin = false;

		if (userData) {
			isAdmin =
				userData.userType === "ADMIN" ||
				userData.authorities?.some((auth) => auth.authority === "ADMIN");

			if (!isAdmin) {
				navigate("/profile");
			}
			console.log(userData.userType);
		}
	}, [navigate, userData]);

	return (
		<div>
			<ListUsers />
		</div>
	);
};

export default AdminPage;
