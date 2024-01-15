import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import calendarIcon from "../assets/icons/calendar.png";
import balanceIcon from "../assets/icons/balance.png";
import budgetIcon from "../assets/icons/budget.png";
import reportsIcon from "../assets/icons/report.png";
import { Link } from "react-router-dom";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const NavbarContainer = styled("div")({
	width: "64px",
	height: "100vh",
	position: "fixed",
	left: 0,
	top: 0,
	zIndex: 1201,
	backgroundColor: "#333",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "10px 0",
});

const NavbarButton = styled(IconButton)({
	margin: "10px 0",
	color: "white",
	filter: "invert(100%)",
	transition: "transform 0.2s ease-in-out",
	"&:hover": {
		backgroundColor: "rgba(255, 255, 255, 0.08)",
	},
	"&:active": {
		transform: "scale(0.9)",
	},

	"& *": {
		userSelect: "none",
	},

	"&:focus": {
		outline: "none",
	},
});

const NavbarIcon = styled("img")({
	width: "30px",
	height: "30px",
	marginBottom: "4px",
});

const NavbarText = styled(Typography)({
	fontSize: "0.75rem",
	color: "white",
	marginTop: "-4px",
	userSelect: "none",
});

const Navbar: React.FC = () => {
	return (
		<NavbarContainer>
			<Box
				sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
			>
				{[
					{ icon: calendarIcon, label: "Today", path: "/" },
					{ icon: balanceIcon, label: "Balance", path: "/balance" },
					{ icon: budgetIcon, label: "Budget", path: "/budget" },
					{ icon: reportsIcon, label: "Reports", path: "/reports" },
				].map((item, index) => (
					<Box
						key={index}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Link to={item.path} style={{ textDecoration: "none" }}>
							<NavbarButton>
								<NavbarIcon src={item.icon} alt={item.label} />
							</NavbarButton>
						</Link>
						<NavbarText>{item.label}</NavbarText>
					</Box>
				))}
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginBottom: "20px",
				}}
			>
				<Link to="/profile" style={{ textDecoration: "none" }}>
					<NavbarButton>
						<InsertEmoticonIcon fontSize="large" style={{ color: "black" }} />
					</NavbarButton>
				</Link>
				<NavbarText>Profile</NavbarText>
			</Box>
		</NavbarContainer>
	);
};
export default Navbar;
