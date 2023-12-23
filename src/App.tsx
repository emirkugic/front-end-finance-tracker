import React from "react";
import Login from "./components/login/Login";
import ExpensesPieGraph from "./components/graphs/expenses/ExpensesPieGraph/ExpensesPieGraph";
import IncomesGraph from "./components/graphs/incomes/IncomesGraph";
import { user_id } from "./constants";
import "./App.css";
import ExpensesGraph from "./components/graphs/expenses/ExpenseGraph/ExpenseGraph";
import ExpensesList from "./components/graphs/expenses/ExpensesList/ExpensesList";
import IncomesList from "./components/graphs/incomes/IncomeList/IncomesList";
import BalanceGraph from "./components/graphs/FinancialOverviewGraph/BalanceGraph";
import ExpenseForm from "./components/graphs/expenses/CreateComponents/ExpenseForm";
import Navbar from "./components/navbar/Navbar";

const App: React.FC = () => {
	return (
		<>
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
					<ExpensesGraph
						userId={user_id}
						startDate={"2000-01-01"}
						endDate={"2100-01-01"}
						groupBy={"category"}
					/>
					<ExpensesPieGraph
						startDate="2020-01-01"
						endDate="2100-01-01"
						parameter="category"
					/>
					<ExpensesPieGraph
						startDate="2020-01-01"
						endDate="2100-01-01"
						parameter="source"
					/>
					<IncomesGraph
						userId={user_id}
						startDate={"2000-01-01"}
						endDate={"2100-01-01"}
						groupBy={"from"}
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
			</div>
		</>
	);
};

export default App;
