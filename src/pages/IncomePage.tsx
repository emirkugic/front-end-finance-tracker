import React, { useState } from "react";
import IncomesList from "../components/IncomesList";
import { user_id } from "../constants";
import CreateIncomeModal from "../components/CreateIncomeModal";

const IncomePage: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleCloseModal = () => setModalOpen(false);

	return (
		<div>
			<IncomesList
				userId={user_id}
				startDate={"2000-01-01"}
				endDate={"2100-01-01"}
			/>
			<CreateIncomeModal open={modalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default IncomePage;
