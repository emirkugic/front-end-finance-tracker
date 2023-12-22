import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useLocation,
} from "react-router-dom";
import Login from "./components/login/Login";

const NavigationButton: React.FC = () => {
	const location = useLocation();

	if (location.pathname === "/login") {
		return null; // Don't render the button on the login page
	}

	return (
		<Link to="/login">
			<button>Go to Login</button>
		</Link>
	);
};

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<NavigationButton />
				<Routes>
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
