import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import CreditCard from "../components/CreditCard";
import Balance from "../components/Balance";
import useCreditCardDetails from "../hooks/useCreditCardDetails"; // Import your custom hook

const BalancePage: React.FC = () => {
	const userId = "6549031fc02fd9204841b306"; // Replace with actual user ID or fetch it dynamically
	const { cards, loading, error } = useCreditCardDetails(userId); // Use the hook to fetch card details

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
						<CreditCard card={card} />{" "}
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default BalancePage;
