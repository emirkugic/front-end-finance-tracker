import React, { useEffect, useState } from "react";
import CreditCard from "./CreditCard";
import useCreditCardDetails from "../hooks/useCreditCardDetails";

const ListCards = ({ userId }) => {
	const { cards, loading, error } = useCreditCardDetails(userId);
	const [cardList, setCardList] = useState([]);

	useEffect(() => {
		if (cards) {
			setCardList(cards);
		}
	}, [cards]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{cardList.map((card) => (
				<CreditCard key={card.id} card={card} />
			))}
		</div>
	);
};

export default ListCards;
