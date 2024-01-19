import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";

const useFetchCardName = (cardId: string) => {
	const [cardName, setCardName] = useState<string | null>(null);

	useEffect(() => {
		const fetchCardName = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/credit-cards/getCardName/${cardId}`
				);
				setCardName(response.data || "Unknown Card");
			} catch (error) {
				console.log("Error fetching card name:", error);
				setCardName("Unknown Card");
			}
		};

		if (cardId !== "Cash" && cardId !== "cash") {
			fetchCardName();
		} else {
			setCardName("Cash");
		}
	}, [cardId]);

	return cardName;
};

export default useFetchCardName;
