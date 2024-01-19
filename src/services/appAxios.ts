import axios from "axios";
import { API_URL } from "../constants";

const appAxios = axios.create({
	baseURL: API_URL,
	timeout: 10000,
});

export default appAxios;
