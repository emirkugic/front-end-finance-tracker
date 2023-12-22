import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login/Login";
import ExpensesPieGraph from "./components/graphs/expenses/ExpensesPieGraph/ExpensesPieGraph";
import IncomesGraph from "./components/graphs/incomes/IncomesGraph";
import { user_id } from "./constants";

const App: React.FC = () => {
	return (
		<Router>
			<Login />
			<div className="charts">
				<div>
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
		</Router>
	);
};

export default App;
