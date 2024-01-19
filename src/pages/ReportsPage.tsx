import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import ExpensesPieGraph from "../components/ExpensesPieGraph/ExpensesPieGraph";
import CombinedDataList from "../components/CombinedDataList";
import useAuthToken from "../hooks/useAuthToken";
import IncomePie from "../components/IncomePie";

const ReportsPage = () => {
	const token = useAuthToken();
	const [userId, setUserId] = useState("");

	useEffect(() => {
		if (token) {
			const tokenPayload = JSON.parse(atob(token.split(".")[1]));
			setUserId(tokenPayload.userId);
		}
	}, [token]);

	return (
		<>
			<Box sx={{ flexGrow: 1, padding: 2 }}>
				<Typography
					variant="h4"
					gutterBottom
					component="div"
					sx={{ marginBottom: 4 }}
				>
					Reports Page
				</Typography>
				<Grid container spacing={2} alignItems="center" justifyContent="center">
					<Grid item xs={12} md={4}>
						<Paper
							elevation={0}
							sx={{ padding: 2, backgroundColor: "transparent" }}
						>
							<Typography variant="h6" gutterBottom>
								Your income is received through
							</Typography>
							<IncomePie
								startDate="2020-01-01"
								endDate="2100-01-01"
								groupBy="receivedThrough"
								userId={userId}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper
							elevation={0}
							sx={{ padding: 2, backgroundColor: "transparent" }}
						>
							<Typography variant="h6" gutterBottom>
								Your main income comes from
							</Typography>
							<IncomePie
								startDate="2020-01-01"
								endDate="2100-01-01"
								groupBy="source"
								userId={userId}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper
							elevation={0}
							sx={{ padding: 2, backgroundColor: "transparent" }}
						>
							<Typography variant="h6" gutterBottom>
								Your main income providers
							</Typography>
							<IncomePie
								startDate="2020-01-01"
								endDate="2100-01-01"
								groupBy="from"
								userId={userId}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper
							elevation={0}
							sx={{ padding: 2, backgroundColor: "transparent" }}
						>
							<Typography variant="h6" gutterBottom>
								You spent your money on
							</Typography>
							<ExpensesPieGraph
								startDate="2020-01-01"
								endDate="2100-01-01"
								parameter="category"
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper
							elevation={0}
							sx={{ padding: 2, backgroundColor: "transparent" }}
						>
							<Typography variant="h6" gutterBottom>
								Your preferred payment method
							</Typography>
							<ExpensesPieGraph
								startDate="2020-01-01"
								endDate="2100-01-01"
								parameter="source"
							/>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<CombinedDataList
							userId={userId}
							startDate="2020-01-01"
							endDate="2100-01-01"
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default ReportsPage;
