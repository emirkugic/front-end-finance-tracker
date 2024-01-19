import { Grid, Paper, Box } from "@mui/material";
import ExpensesPieGraph from "../components/ExpensesPieGraph/ExpensesPieGraph";
import CombinedDataList from "../components/CombinedDataList";

const ReportsPage = () => {
	return (
		<>
			<Box sx={{ flexGrow: 1, padding: 2 }}>
				<div>
					<h1 style={{ color: "black" }}>Reports Page</h1>

					<h4 style={{ color: "black" }}>
						combine the two lists into one big one showing the user his
						spendings and earnings in chronological order. only have start and
						end date and have the ability to sort ascending or descending order.
						name this component ActivityList.tsx and use rafce for this
						component. TLDR: make a component that will list spending and
						earnings in one list together
					</h4>

					<CombinedDataList
						userId={"6549031fc02fd9204841b306"}
						startDate="2020-01-01"
						endDate="2100-01-01"
					/>
				</div>
				<Grid container spacing={2} alignItems="center" justifyContent="center">
					<Grid item xs={12} md={6}>
						<Paper
							elevation={0}
							sx={{ padding: 2, backgroundColor: "transparent" }}
						></Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper
							elevation={0}
							sx={{ padding: 2, backgroundColor: "transparent" }}
						>
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
							<ExpensesPieGraph
								startDate="2020-01-01"
								endDate="2100-01-01"
								parameter="source"
							/>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default ReportsPage;
