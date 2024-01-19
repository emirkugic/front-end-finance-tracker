import React, { useEffect, useState } from "react";
import ExpensesList from "../components/ExpensesList";
import CreateExpenseModal from "../components/CreateExpenseModal";
import useAuthToken from "../hooks/useAuthToken";

const ExpensePage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const token = useAuthToken();
	const [userId, setUserId] = useState("");

	useEffect(() => {
		if (token) {
			const tokenPayload = JSON.parse(atob(token.split(".")[1]));
			setUserId(tokenPayload.userId);
		}
	}, [token]);

	return (
		<div>
			<h1 style={{ color: "black" }}>Expenses</h1>
			<ExpensesList
				userId={userId}
				startDate={"2002-10-10"}
				endDate={"2100-01-01"}
			/>
			<CreateExpenseModal open={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default ExpensePage;
