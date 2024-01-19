import React, { useEffect, useState } from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Typography,
	Box,
	useTheme,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useFetchAndCombineData from "../hooks/useFetchAndCombineData";
import axios from "axios";
import { API_URL } from "../constants";

interface CombinedDataListProps {
	userId: string;
	startDate: string;
	endDate: string;
}

const CombinedDataList: React.FC<CombinedDataListProps> = ({
	userId,
	startDate,
	endDate,
}) => {
	const combinedData = useFetchAndCombineData(userId, startDate, endDate);
	const theme = useTheme();

	const formatDate = (dateString: string): string => {
		return new Date(dateString).toLocaleDateString(undefined, {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	const [cardNames, setCardNames] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		const fetchCardName = async (cardId: string) => {
			try {
				const response = await axios.get(
					`${API_URL}/credit-cards/getCardName/${cardId}`
				);
				setCardNames((prevCardNames) => ({
					...prevCardNames,
					[cardId]: response.data || "Unknown Card",
				}));
			} catch (error) {
				console.error("Error fetching card name:", error);
				setCardNames((prevCardNames) => ({
					...prevCardNames,
					[cardId]: "Unknown Card",
				}));
			}
		};

		combinedData.forEach((data) => {
			if (
				data.accountOrReceivedThrough &&
				!cardNames[data.accountOrReceivedThrough]
			) {
				if (
					data.accountOrReceivedThrough.toLowerCase() !== "cash" &&
					data.accountOrReceivedThrough.toLowerCase() !== "credit card"
				) {
					fetchCardName(data.accountOrReceivedThrough);
				} else {
					setCardNames((prevCardNames) => ({
						...prevCardNames,
						[data.accountOrReceivedThrough]: "Cash",
					}));
				}
			}
		});
	}, [combinedData, cardNames]);

	return (
		<List sx={{ color: "black" }}>
			{combinedData.map((data, index) => {
				const formattedDate = formatDate(data.date);
				const amountColor = data.type === "income" ? green[600] : red[600];
				const Icon =
					data.type === "income" ? ArrowUpwardIcon : ArrowDownwardIcon;

				const cardName =
					cardNames[data.accountOrReceivedThrough] ||
					data.accountOrReceivedThrough;

				return (
					<ListItem
						key={index}
						alignItems="flex-start"
						sx={{
							borderBottom: `1px solid ${theme.palette.divider}`,
							justifyContent: "space-between",
						}}
					>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: amountColor }}>
								<Icon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={data.categoryOrSource}
							primaryTypographyProps={{ style: { fontWeight: "bold" } }}
							secondary={
								<>
									<Typography
										component="span"
										variant="body2"
										color="text.primary"
									>
										{formattedDate}
									</Typography>
									{" — "}
									{cardName}
								</>
							}
						/>
						<Box textAlign="right" flexShrink={0}>
							<Typography variant="body1" color={amountColor}>
								{`${data.type === "income" ? "+" : "-"}${Math.abs(
									data.amount
								).toLocaleString(undefined, {
									style: "currency",
									currency: "USD",
								})}`}
							</Typography>
						</Box>
					</ListItem>
				);
			})}
		</List>
	);
};

export default CombinedDataList;
