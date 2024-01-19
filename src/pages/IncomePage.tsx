import React, { useEffect, useState } from "react";
import IncomesList from "../components/IncomesList";
import CreateIncomeModal from "../components/CreateIncomeModal";
import useAuthToken from "../hooks/useAuthToken";

const IncomePage: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleCloseModal = () => setModalOpen(false);

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
			<h1 style={{ color: "black" }}>Incomes</h1>
			<IncomesList
				userId={userId}
				startDate={"2000-01-01"}
				endDate={"2100-01-01"}
			/>
			<CreateIncomeModal open={modalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default IncomePage;
