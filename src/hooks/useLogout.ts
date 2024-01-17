import { useNavigate } from "react-router-dom";

const useLogout = () => {
	const navigate = useNavigate();

	const logout = async () => {
		await new Promise<void>((resolve) => {
			localStorage.removeItem("jwtToken");
			resolve();
		});

		navigate("/");
	};

	return logout;
};

export default useLogout;
