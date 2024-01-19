import React, { useEffect, useState } from "react";
import { Grid, Box, Fab, useTheme } from "@mui/material";
import CreditCard from "../components/CreditCard";
import Balance from "../components/Balance";
import AddIcon from "@mui/icons-material/Add";
import useCreditCardDetails from "../hooks/useCreditCardDetails";
import CreateCardModal from "../components/CreateCardModal";
import useAuthToken from "../hooks/useAuthToken";

const BalancePage: React.FC = () => {
	const [openModal, setOpenModal] = useState(false);
	const theme = useTheme();
	// const userId = "6549031fc02fd9204841b306";

	const token = useAuthToken();
	const [userId, setUserId] = useState("");

	useEffect(() => {
		if (token) {
			const tokenPayload = JSON.parse(atob(token.split(".")[1]));
			setUserId(tokenPayload.userId);
		}
	}, [token]);

	const { cards, loading, error } = useCreditCardDetails(userId);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<>
			<Box pb={2}>
				<Balance />
			</Box>
			<Grid container spacing={2}>
				{cards.map((card) => (
					<Grid key={card.id} item xs={12} sm={6} md={4} lg={3}>
						<CreditCard card={card} />
					</Grid>
				))}
			</Grid>
			<Fab
				color="primary"
				aria-label="add"
				style={{
					position: "fixed",
					bottom: theme.spacing(2),
					right: theme.spacing(2),
				}}
				onClick={handleOpenModal}
			>
				<AddIcon />
			</Fab>
			<CreateCardModal
				open={openModal}
				onClose={handleCloseModal}
				userId={userId}
			/>
		</>
	);
};

export default BalancePage;
