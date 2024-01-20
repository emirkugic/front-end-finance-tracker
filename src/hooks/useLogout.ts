import { useNavigate } from "react-router-dom";

const useLogout = () => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("jwtToken");
		navigate("/");
	};

	return logout;
};

export default useLogout;
