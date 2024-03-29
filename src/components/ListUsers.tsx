import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useFetchAllUsers from "../hooks/useFetchAllUsers";
import useDeleteUser from "../hooks/useDeleteUser";
import useLogout from "../hooks/useLogout";
import UserCard from "./UserCard";
import LogoutIcon from "@mui/icons-material/Logout";

const ListUsers = () => {
	const { users, loading, error } = useFetchAllUsers();
	const { deleteUser } = useDeleteUser();
	const [searchTerm, setSearchTerm] = useState("");
	const [usersList, setUsersList] = useState(users || []);

	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down("sm"));
	const logout = useLogout();

	const handleDeleteUser = async (userId: string) => {
		await deleteUser(userId);
		setUsersList(usersList.filter((user) => user.id !== userId));
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		setUsersList(users);
	}, [users]);

	const filteredUsers = usersList.filter(
		(user) =>
			user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.id?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (loading) return <h2>Loading...</h2>;
	if (error) return <p>Error: {error}</p>;

	return (
		<>
			<AppBar position="fixed" color="default" elevation={1}>
				<Toolbar>
					<Container
						maxWidth="md"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<TextField
							size={isXs ? "small" : "medium"}
							label="Search Users"
							variant="outlined"
							margin="normal"
							onChange={handleSearchChange}
							value={searchTerm}
							sx={{ flexGrow: 1 }}
						/>
						<Button
							color="inherit"
							startIcon={<LogoutIcon />}
							onClick={logout}
							sx={{ marginLeft: 2 }}
						>
							Logout
						</Button>
					</Container>
				</Toolbar>
			</AppBar>
			<Box mt={10}>
				<Container maxWidth="md">
					<Grid container spacing={2}>
						{filteredUsers.map((user) => (
							<Grid item xs={12} sm={6} md={4} key={user.id}>
								<UserCard
									user={user}
									onDelete={() => handleDeleteUser(user.id)}
								/>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default ListUsers;
