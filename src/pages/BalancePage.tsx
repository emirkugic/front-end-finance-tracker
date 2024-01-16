import React, { useState } from "react";
import { Box, Paper, Typography, Collapse } from "@mui/material";
import CreditCard from "../components/credit_card/CreditCard";

const BalanceNode = ({ label, amount }) => {
	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Paper sx={{ padding: 1 }}>
				<Typography variant="h6">
					{label}: ${amount}
				</Typography>
			</Paper>
			<Box sx={{ width: "2px", height: "20px", backgroundColor: "black" }} />
		</Box>
	);
};

const CreditCardList = ({ cards, showCards }) => {
	return (
		<Collapse in={showCards}>
			{cards.map((card, index) => (
				<Box key={index} sx={{ marginTop: 1 }}>
					<CreditCard {...card} />
				</Box>
			))}
		</Collapse>
	);
};

const BalanceTree = ({ total, cash, cards }) => {
	const [showCards, setShowCards] = useState(false);

	return (
		<Box
			sx={{
				padding: 2,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<BalanceNode label="Total Balance" amount={total} />
			<Box sx={{ display: "flex" }}>
				<Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
					<Box
						sx={{
							marginRight: "-2px",
							width: "2px",
							height: "50px",
							backgroundColor: "black",
						}}
					/>
				</Box>
				<Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
					<Box
						sx={{
							marginLeft: "-2px",
							width: "2px",
							height: "50px",
							backgroundColor: "black",
						}}
					/>
				</Box>
			</Box>
			<Box
				sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
			>
				<BalanceNode label="Cash" amount={cash} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Box
						onClick={() => setShowCards(!showCards)}
						style={{ cursor: "pointer" }}
					>
						<BalanceNode
							label="Credit Cards"
							amount={cards.reduce((acc, card) => acc + card.amount, 0)}
						/>
					</Box>
					<CreditCardList cards={cards} showCards={showCards} />
				</Box>
			</Box>
		</Box>
	);
};

const BalancePage = () => {
	// Mock data
	const totalBalance = 1000;
	const cashBalance = 650;
	const cardBalances = [
		{ name: "Card 1", amount: 50 /* ...other props */ },
		{ name: "Card 2", amount: 400 /* ...other props */ },
	];

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
			<div>
				<h1>Balance Page</h1>
				<BalanceTree
					total={totalBalance}
					cash={cashBalance}
					cards={cardBalances}
				/>
			</div>
		</Box>
	);
};

export default BalancePage;
