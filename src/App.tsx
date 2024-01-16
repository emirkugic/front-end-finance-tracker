import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import ReportsPage from "./pages/ReportsPage";
import BalancePage from "./pages/BalancePage";
import IncomePage from "./pages/IncomePage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Box from "@mui/material/Box";
import "./App.css";

const App = () => {
	return (
		<Router>
			<Box sx={{ paddingTop: 8 }}>
				{" "}
				<ResponsiveAppBar />
				<Routes>
					<Route path="/profile" element={<UserProfilePage />} />
					<Route path="/reports" element={<ReportsPage />} />
					<Route path="/balance" element={<BalancePage />} />
					<Route path="/income" element={<IncomePage />} />
				</Routes>
			</Box>
		</Router>
	);
};

export default App;

/*
<CreditCard />
			

			<ExpenseForm />
			<BalanceGraph
				userId={user_id}
				startDate={"2023-10-10"}
				endDate={"2024-01-01"}
			/>

			
			<Login />

			<div className="charts">
				<div>
					
					
					<IncomesGraph
						userId={user_id}
						startDate={"2000-01-01"}
						endDate={"2100-01-01"}
						groupBy={"source"}
					/>
					<IncomesGraph
						userId={user_id}
						startDate={"2000-01-01"}
						endDate={"2100-01-01"}
						groupBy={"receivedThrough"}
					/>
				</div>
			</div>
*/
