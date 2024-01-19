import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import ReportsPage from "./pages/ReportsPage";
import BalancePage from "./pages/BalancePage";
import IncomePage from "./pages/IncomePage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Box from "@mui/material/Box";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ExpensePage from "./pages/ExpensePage";
import NotFound from "./pages/NotFound";
import LoginPage2 from "./pages/LoginPage2";
import AdminPage from "./pages/AdminPage";

const App = () => {
	return (
		<Router>
			<Box sx={{ paddingTop: 8 }}>
				<ResponsiveAppBar />
				<Routes>
					<Route path="/profile" element={<UserProfilePage />} />
					<Route path="/reports" element={<ReportsPage />} />
					<Route path="/balance" element={<BalancePage />} />
					<Route path="/income" element={<IncomePage />} />
					<Route path="/expenses" element={<ExpensePage />} />
					{/* <Route path="/login" element={<LoginPage />} /> */}
					<Route path="/login" element={<LoginPage2 />} />
					<Route path="/admin" element={<AdminPage />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Box>
		</Router>
	);
};

export default App;

/*
			

			<BalanceGraph
				userId={user_id}
				startDate={"2023-10-10"}
				endDate={"2024-01-01"}
			/>

			
					
					
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
			
*/
