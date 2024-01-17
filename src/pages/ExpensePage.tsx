import React, { useState } from "react";
import ExpensesList from "../components/ExpensesList";
import CreateExpenseModal from "../components/CreateExpenseModal";
import { user_id } from "../constants";

const ExpensePage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<h1 style={{ color: "black" }}>Expenses</h1>
			<ExpensesList
				userId={user_id}
				startDate={"2002-10-10"}
				endDate={"2100-01-01"}
			/>
			<CreateExpenseModal open={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default ExpensePage;
