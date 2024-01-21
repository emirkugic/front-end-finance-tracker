import React, { useEffect, useState } from "react";
import { Typography, Button, Paper, Grid, Container } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import useFetchUserData from "../hooks/useFetchUserData";
import useCreditCardBalances from "../hooks/useCreditCardBalances";
import useAuthToken from "../hooks/useAuthToken";
import { jwtDecode } from "jwt-decode";

const Balance = () => {
	const token = useAuthToken();
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (token) {
			const decoded = jwtDecode(token);
			setUserId(decoded.userId);
		}
	}, [token]);

	const {
		userData,
		loading: userLoading,
		error: userError,
	} = useFetchUserData(userId);
	const {
		balances: cardBalance,
		loading: cardLoading,
		error: cardError,
	} = useCreditCardBalances(userId);

	if (userLoading || cardLoading) return <div>Loading...</div>;
	if (userError || cardError) return <div>Error: {userError || cardError}</div>;

	const totalUserBalance = userData?.balance || 0;
	const totalCardBalance = parseFloat(cardBalance) || 0;
	const cashBalance = totalUserBalance - totalCardBalance;

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
					${totalUserBalance.toFixed(2)} USD
				</Typography>
				<Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
					Estimated total of all currencies
				</Typography>

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
						<Typography variant="body1">
							USD ${cashBalance.toFixed(2)}
						</Typography>
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
						<Typography variant="body1">
							USD ${totalCardBalance.toFixed(2)}
						</Typography>
					</Grid>
				</Grid>
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
