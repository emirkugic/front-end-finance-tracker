import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useFetchUserData from "../hooks/useFetchUserData";
import { useEffect, useState } from "react";

const Card = styled(Box)<{ pattern: string }>(({ pattern }) => ({
	width: 345,
	backgroundColor: "#fff",
	borderRadius: 16,
	padding: 32,
	boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	aspectRatio: "16 / 9",
	backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
		pattern
	)}")`,
	backgroundSize: "cover",
}));

const TopSection = styled("div")({
	display: "flex",
	justifyContent: "space-between",
	width: "100%",
});

const BottomSection = styled("div")({
	display: "flex",
	justifyContent: "space-between",
	width: "100%",
});

const getRandomBaseAndDarkerColors = () => {
	const hue = Math.floor(Math.random() * 360);
	const saturation = 100;
	const lightness = Math.floor(Math.random() * 15) + 85;
	const baseColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	const darkColor = `hsl(${hue}, ${saturation}%, ${lightness - 20}%)`;
	const darkerColor = `hsl(${hue}, ${saturation}%, ${lightness - 30}%)`;
	return { baseColor, darkColor, darkerColor };
};

const generateSineWavePath = (
	amplitude: number,
	frequency: number,
	phase: number,
	yOffset: number,
	color: string
): string => {
	let pathD = `M 0 ${yOffset + amplitude * Math.sin(phase)}`;
	for (let x = 0; x <= 800; x++) {
		const y = yOffset + amplitude * Math.sin(x * frequency + phase);
		pathD += ` L ${x} ${y}`;
	}
	pathD += " L 800 400 L 0 400 Z";
	return `<path d="${pathD}" fill="${color}"/>`;
};

const generateWavyPattern = (): string => {
	const { baseColor, darkColor, darkerColor } = getRandomBaseAndDarkerColors();

	const randomPhaseShift = Math.random() * 2 * Math.PI; // Random phase shift for wave position

	const wave1 = generateSineWavePath(
		20,
		0.02,
		randomPhaseShift,
		150,
		darkColor
	);
	const wave2 = generateSineWavePath(
		15,
		0.02,
		randomPhaseShift + Math.PI,
		250,
		darkerColor
	);

	return `
    <svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <rect width="800" height="400" fill="${baseColor}"/>
      ${wave1}
      ${wave2}
    </svg>
  `;
};

const CreditCard = ({ card }) => {
	const { userData } = useFetchUserData(card.userId);
	const pattern = generateWavyPattern();

	const [userName, setUserName] = useState("");

	useEffect(() => {
		if (userData) {
			setUserName(`${userData.name} ${userData.surname}`);
		}
	}, [userData]);

	return (
		<Card pattern={pattern}>
			<TopSection>
				<Typography
					variant="h6"
					component="div"
					color="text.primary"
					sx={{ alignSelf: "flex-start", fontSize: "1.25rem" }}
				>
					{userName} {/* Display the user's name */}
				</Typography>
				<Typography
					variant="body1"
					color="text.secondary"
					sx={{ alignSelf: "flex-start", fontSize: "1rem" }}
				>
					{card.cardName} {/* Display the card name */}
				</Typography>
			</TopSection>
			<BottomSection>
				<Typography
					variant="h5"
					component="div"
					color="text.primary"
					sx={{ alignSelf: "flex-end", fontSize: "1.5rem" }}
				>
					${card.balance.toFixed(2)} {/* Display the card balance */}
				</Typography>
				<Typography
					variant="h6"
					component="div"
					color="text.primary"
					sx={{ alignSelf: "flex-end", fontSize: "1.25rem" }}
				>
					{card.cardNumber.slice(-4)}{" "}
					{/* Display the last 4 digits of the card number */}
				</Typography>
			</BottomSection>
		</Card>
	);
};

export default CreditCard;
