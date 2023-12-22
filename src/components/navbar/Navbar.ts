import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";

import calendarIcon from "../icons/calendar.png";
import balanceIcon from "../icons/balance.png";
import budgetIcon from "../icons/budget.png";
import reportsIcon from "../icons/report.png";
import syncIcon from "../icons/sync.png";

import "./Navbar.css";

const Navbar: React.FC = () => {
	const handleContextMenu = (e: MouseEvent) => {
		e.preventDefault();
	};

	return (
		<nav className="vertical-nav">
			<Link to="/today" className="nav-item" onContextMenu={handleContextMenu}>
				<img src={calendarIcon} alt="Today" />
				<p>Today</p>
			</Link>
			<Link
				to="/balance"
				className="nav-item"
				onContextMenu={handleContextMenu}
			>
				<img src={balanceIcon} alt="Balance" />
				<p>Balance</p>
			</Link>
			<Link to="/budget" className="nav-item" onContextMenu={handleContextMenu}>
				<img src={budgetIcon} alt="Budget" />
				<p>Budget</p>
			</Link>
			<Link
				to="/reports"
				className="nav-item"
				onContextMenu={handleContextMenu}
			>
				<img src={reportsIcon} alt="Reports" />
				<p>Reports</p>
			</Link>
			<Link
				to="/sync"
				className="nav-item bottom"
				onContextMenu={handleContextMenu}
			>
				<img src={syncIcon} alt="Sync" />
				<p>Sync</p>
			</Link>
		</nav>
	);
};

export default Navbar;
