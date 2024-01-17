import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../constants";

// Define a TypeScript interface for the payload
interface LoginPayload {
	email: string;
	password: string;
}

export const loginUser = createAsyncThunk(
	"/auth/loginUser",
	async ({ email, password }: LoginPayload, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || "Login failed!");
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Define a TypeScript interface for the registration payload
interface RegisterPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (
		{ firstName, lastName, email, password }: RegisterPayload,
		{ rejectWithValue }
	) => {
		try {
			const response = await fetch(`${API_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ firstName, lastName, email, password }),
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || "Registration failed!");
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	loading: false,
	userInfo: null,
	userToken: null,
	error: null,
	success: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload.user; // adjust according to your API response
				state.userToken = action.payload.jwt; // adjust according to your API response
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload.user; // adjust according to your API response
				state.success = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
		// Add cases for registerUser similarly
	},
});

export default authSlice.reducer;
