// import Login from "./components/login/Login";
// import ExpensesPieGraph from "./components/graphs/expenses/ExpensesPieGraph/ExpensesPieGraph";
// import IncomesGraph from "./components/graphs/incomes/IncomesGraph";
// import { user_id } from "./constants";
// import ExpensesGraph from "./components/graphs/expenses/ExpenseGraph/ExpenseGraph";
// import ExpensesList from "./components/graphs/expenses/ExpensesList/ExpensesList";
// import IncomesList from "./components/graphs/incomes/IncomeList/IncomesList";
// import BalanceGraph from "./components/graphs/FinancialOverviewGraph/BalanceGraph";
// import ExpenseForm from "./components/graphs/expenses/CreateComponents/ExpenseForm";
// import Navbar from './components/navbar/Navbar';
// import CreditCard from "./components/credit_card/CreditCard";

import "./App.css";
import UserProfilePage from "./pages/UserProfilePage";
import ReportsPage from "./pages/ReportsPage";
import Navbar from "./components/Navbar";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useLocation,
} from "react-router-dom";
import BalancePage from "./pages/BalancePage";
import IncomePage from "./pages/IncomePage";

const Navigation = () => {
	const location = useLocation();
	const shouldDisplayNavbar = location.pathname !== "/";

	return (
		<nav>
			<Navbar />
			{!shouldDisplayNavbar && <Button />}
		</nav>
	);
};

const Button = () => {
	return (
		<Link to="/profile">
			<button>Go to Profile</button>
		</Link>
	);
};

const App = () => {
	return (
		<Router>
			<div>
				<Navigation />

				<Routes>
					<Route path="/profile" element={<UserProfilePage />} />
					<Route path="/reports" element={<ReportsPage />} />
					<Route path="/balance" element={<BalancePage />} />
					<Route path="/income" element={<IncomePage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;

/*
<CreditCard />
			<CreditCard />
			<CreditCard />
			<CreditCard />
			<CreditCard />
			<Navbar />

			<ExpenseForm />
			<BalanceGraph
				userId={user_id}
				startDate={"2023-10-10"}
				endDate={"2024-01-01"}
			/>

			<IncomesList
				userId={user_id}
				startDate={"2000-01-01"}
				endDate={"2100-01-01"}
			/>

			<ExpensesList
				userId={user_id}
				startDate={"2000-01-01"}
				endDate={"2100-01-01"}
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
