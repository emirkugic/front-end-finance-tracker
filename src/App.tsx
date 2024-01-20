import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import ReportsPage from "./pages/ReportsPage";
import BalancePage from "./pages/BalancePage";
import IncomePage from "./pages/IncomePage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Box from "@mui/material/Box";
import "./App.css";
import ExpensePage from "./pages/ExpensePage";
import NotFound from "./pages/NotFound";
import LoginPage2 from "./pages/LoginPage2";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";

const AppContent = () => {
	const location = useLocation();
	const shouldDisplayNavbar = location.pathname !== "/";

	return (
		<>
			{shouldDisplayNavbar && <ResponsiveAppBar />}
			<Routes>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<UserProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/reports"
					element={
						<ProtectedRoute>
							<ReportsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/balance"
					element={
						<ProtectedRoute>
							<BalancePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/income"
					element={
						<ProtectedRoute>
							<IncomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/expenses"
					element={
						<ProtectedRoute>
							<ExpensePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<AdminPage />
						</ProtectedRoute>
					}
				/>

				{/* unprotected routes */}
				<Route path="/login" element={<LoginPage2 />} />
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

const App = () => {
	return (
		<Router>
			<Box sx={{ paddingTop: 8 }}>
				<AppContent />
			</Box>
		</Router>
	);
};

export default App;

// import React from "react";
// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Routes,
// 	useLocation,
// } from "react-router-dom";
// import UserProfilePage from "./pages/UserProfilePage";
// import ReportsPage from "./pages/ReportsPage";
// import BalancePage from "./pages/BalancePage";
// import IncomePage from "./pages/IncomePage";
// import ResponsiveAppBar from "./components/ResponsiveAppBar";
// import Box from "@mui/material/Box";
// import "./App.css";
// import ExpensePage from "./pages/ExpensePage";
// import NotFound from "./pages/NotFound";
// import LoginPage2 from "./pages/LoginPage2";
// import AdminPage from "./pages/AdminPage";
// import HomePage from "./pages/HomePage";

// const AppContent = () => {
// 	const location = useLocation();

// 	const shouldDisplayNavbar = location.pathname !== "/";

// 	return (
// 		<>
// 			{shouldDisplayNavbar && <ResponsiveAppBar />}
// 			<Routes>
// 				<Route path="/profile" element={<UserProfilePage />} />
// 				<Route path="/reports" element={<ReportsPage />} />
// 				<Route path="/balance" element={<BalancePage />} />
// 				<Route path="/income" element={<IncomePage />} />
// 				<Route path="/expenses" element={<ExpensePage />} />
// 				{/* <Route path="/login" element={<LoginPage />} /> */}
// 				<Route path="/login" element={<LoginPage2 />} />
// 				<Route path="/admin" element={<AdminPage />} />
// 				<Route path="/" element={<HomePage />} />

// 				<Route path="*" element={<NotFound />} />
// 			</Routes>
// 		</>
// 	);
// };

// const App = () => {
// 	return (
// 		<Router>
// 			<Box sx={{ paddingTop: 8 }}>
// 				<AppContent />
// 			</Box>
// 		</Router>
// 	);
// };

// export default App;

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
