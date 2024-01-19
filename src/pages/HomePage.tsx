import React from "react";
import {
	Container,
	Typography,
	Box,
	Paper,
	Button,
	Grid,
	Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.grey[200],
	padding: theme.spacing(3),
	marginTop: theme.spacing(3),
	marginBottom: theme.spacing(3),
}));

const FeatureBox = styled(Box)(({ theme }) => ({
	textAlign: "center",
	padding: theme.spacing(2),
}));

const HomePage = () => {
	return (
		<>
			<Box display="flex" justifyContent="flex-end" mt={2}>
				<Link component={RouterLink} to="/login" color="primary">
					Login
				</Link>
			</Box>
			<Container maxWidth="lg">
				<Typography
					variant="h2"
					align="center"
					gutterBottom
					style={{ color: "black" }}
				>
					Welcome to Finance Tracker
				</Typography>

				<StyledPaper elevation={3}>
					<Typography variant="h3" style={{ color: "black" }}>
						Finance Tracker
					</Typography>
					<Typography variant="h5" style={{ color: "black" }}>
						Created by Emir Kugić
					</Typography>
					<Typography paragraph style={{ color: "black" }}>
						As part of the Web Engineering course at International Burch
						University, under the guidance of Professor Bećir Isaković and TA
						Aldin Kovačević, this app embodies the intersection of finance and
						technology.
					</Typography>
					<Typography paragraph style={{ color: "black" }}>
						I advocate for developing the frontend first, as it sets a tangible
						foundation for the required backend logic. This approach is
						particularly useful for those, like myself, who find frontend
						development more challenging and time-consuming. Using Spring Boot,
						MongoDB, and React, this app is the culmination of practical
						learning and application.
					</Typography>
					<Typography paragraph style={{ color: "black" }}>
						Spring Boot has resonated with me profoundly, quickly becoming my
						backend framework of choice. This course has not only equipped me
						with valuable skills but also with a newfound appreciation for
						backend development.
					</Typography>
					<Box display="flex" justifyContent="center" mt={2}>
						<Button
							variant="contained"
							color="primary"
							href="https://github.com/emirkugic/"
						>
							Visit My GitHub
						</Button>
					</Box>
				</StyledPaper>

				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<FeatureBox>
							<Typography variant="h6" gutterBottom style={{ color: "black" }}>
								Track Your Expenses
							</Typography>
							<Typography style={{ color: "black" }}>
								Log daily expenses and incomes to visualize your financial
								habits with interactive graphs and charts.
							</Typography>
						</FeatureBox>
					</Grid>
					<Grid item xs={12} md={4}>
						<FeatureBox>
							<Typography variant="h6" gutterBottom style={{ color: "black" }}>
								Analyze Spending
							</Typography>
							<Typography style={{ color: "black" }}>
								Gain insights on where you spend the most and identify your
								primary financial contributors.
							</Typography>
						</FeatureBox>
					</Grid>
					<Grid item xs={12} md={4}>
						<FeatureBox>
							<Typography variant="h6" gutterBottom style={{ color: "black" }}>
								Manage Users
							</Typography>
							<Typography style={{ color: "black" }}>
								As an admin, oversee all user accounts with the ability to edit
								or remove users as necessary.
							</Typography>
						</FeatureBox>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default HomePage;
