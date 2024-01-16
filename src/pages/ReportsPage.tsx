import { Grid, Paper, Box } from "@mui/material";
import ExpensesPieGraph from "../components/ExpensesPieGraph/ExpensesPieGraph";
import CreditCard from "../components/CreditCard";

const ReportsPage = () => {
	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
			<div>
				<h1>Reports Page</h1>
			</div>
			<Grid container spacing={2} alignItems="center" justifyContent="center">
				<Grid item xs={12} md={6}>
					<Paper
						elevation={0}
						sx={{ padding: 2, backgroundColor: "transparent" }}
					>
						<CreditCard />
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
	);
};

export default ReportsPage;
