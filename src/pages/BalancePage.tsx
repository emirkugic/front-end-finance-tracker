import { Box } from "@mui/material";
import CreditCard from "../components/credit_card/CreditCard";

const BalancePage = () => {
	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
			<div>
				<h1>Balance Page</h1>
				<CreditCard />
			</div>
		</Box>
	);
};

export default BalancePage;
