import React, { useState, useEffect, useRef } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useAuthToken from "../hooks/useAuthToken";
import useFetchUserData from "../hooks/useFetchUserData";
import useImageUpload from "../hooks/useImageUpload";

const decodeToken = (token: string) => {
	return JSON.parse(atob(token.split(".")[1]));
};

const ProfileImage: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const token = useAuthToken();
	const { uploadImage } = useImageUpload();
	const [profileImageUrl, setProfileImageUrl] = useState<string>("");
	const { userData } = useFetchUserData(
		token ? decodeToken(token).userId : null
	);

	useEffect(() => {
		if (userData && userData.profilePictureUrl) {
			setProfileImageUrl(userData.profilePictureUrl);
		}
	}, [userData]);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const userId = token ? decodeToken(token).userId : null;
		await uploadImage(file, userId);

		const imageUrl = URL.createObjectURL(file);
		setProfileImageUrl(imageUrl);
	};

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<Avatar
				src={profileImageUrl}
				alt="Profile"
				sx={{ width: 150, height: "100%", cursor: "pointer" }}
				onClick={() => fileInputRef.current?.click()}
			/>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
				accept="image/*"
			/>
			<Tooltip title="Edit Profile Picture">
				<IconButton
					sx={{
						position: "absolute",
						bottom: 0,
						right: 0,
						backgroundColor: "white",
					}}
					size="small"
					onClick={() => fileInputRef.current?.click()}
				>
					<EditIcon color="primary" />
				</IconButton>
			</Tooltip>
		</div>
	);
};

export default ProfileImage;
