import React from "react";
import { Grid, Box } from "@mui/material"; // Import Box for adding padding
import CreditCard from "../components/CreditCard";
import Balance from "../components/Balance";

const BalancePage: React.FC = () => {
	return (
		<>
			<Box pb={2}>
				<Balance />
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<CreditCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<CreditCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<CreditCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<CreditCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<CreditCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<CreditCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<CreditCard />
				</Grid>
			</Grid>
		</>
	);
};

export default BalancePage;
