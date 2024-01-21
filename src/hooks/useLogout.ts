import { useNavigate } from "react-router-dom";

const useLogout = () => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("jwtToken");
		navigate("/");
		//refresh page
		window.location.reload();
	};

	return logout;
};

export default useLogout;
