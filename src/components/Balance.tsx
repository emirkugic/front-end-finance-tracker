import React from "react";
import { Typography, Button, Paper, Grid, Container } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Balance = () => {
	return (
		<Container maxWidth="xs">
			<Paper
				elevation={3}
				style={{ padding: "20px", textAlign: "center", marginTop: "20px" }}
			>
				<AccountBalanceWalletIcon style={{ fontSize: 40, color: "#003087" }} />
				<Typography variant="h5" style={{ margin: "10px 0" }}>
					Total Balance
				</Typography>
				<Typography variant="h3" style={{ marginBottom: "10px" }}>
					0,00 USD
				</Typography>
				<Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
					Estimated total of all currencies
				</Typography>
				<Button variant="contained" color="primary" fullWidth>
					Send payments
				</Button>
				<Grid container spacing={2} style={{ marginTop: "20px" }}>
					<Grid
						item
						xs={12}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<span>Cash Balance</span>
						<Typography variant="body1">USD 0,00</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<span>Card Balance</span>
						<Typography variant="body1">USD 0,00</Typography>
					</Grid>
				</Grid>
				<Button fullWidth style={{ marginTop: "20px" }}>
					Add an income
				</Button>
				<Button fullWidth style={{ marginTop: "10px" }}>
					Add an expense
				</Button>
				<Typography
					variant="caption"
					display="block"
					style={{ marginTop: "20px" }}
				>
					Sending money to users feature is coming soon
				</Typography>
			</Paper>
		</Container>
	);
};

export default Balance;
