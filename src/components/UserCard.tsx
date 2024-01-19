import React, { useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	Button,
	CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

type UserType = {
	id: string;
	name: string;
	surname: string;
	userType: string;
	email: string;
};

interface UserCardProps {
	user: UserType;
	onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const handleDelete = () => {
		onDelete(user.id);
		handleCloseModal();
	};

	return (
		<Card sx={{ maxWidth: 345, marginBottom: 2, boxShadow: 3 }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{user.name} {user.surname}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					ID: {user.id}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Email: {user.username}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					UserType: {user.userType}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					color="error"
					startIcon={<DeleteIcon />}
					onClick={handleOpenModal}
				>
					Delete
				</Button>
			</CardActions>
			<DeleteConfirmationModal
				open={openModal}
				onClose={handleCloseModal}
				onConfirm={handleDelete}
			/>
		</Card>
	);
};

export default UserCard;
