import React from "react";
import { Typography, Button, Paper, Grid, Container } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCard from "../components/CreditCard";
import Balance from "../components/Balance";

const scrollableDivStyle = {
	flex: 1,
	overflowY: "auto",
	padding: "20px",
	position: "fixed",
	top: 0,
	bottom: 0,
	left: 0,
	scrollbarWidth: "none", // Hide scrollbar on Firefox
	msOverflowStyle: "none", // Hide scrollbar on Internet Explorer
};

const BalancePage: React.FC = () => {
	return (
		<>
			<div style={{ display: "flex" }}>
				<div style={scrollableDivStyle}>
					<CreditCard />
					<CreditCard />
					<CreditCard />
					<CreditCard />
					<CreditCard />
					<CreditCard />
					<CreditCard />
					<CreditCard />
				</div>
				<div style={{ flex: 1, marginLeft: "auto", padding: "20px" }}>
					<Balance />
				</div>
			</div>
		</>
	);
};

export default BalancePage;
