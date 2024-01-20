import { useState } from "react";
import { API_URL } from "../constants"; // API_URL = "http://localhost:8080/api";

const useImageUpload = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const uploadImage = async (image, userId) => {
		setIsLoading(true);
		setError(null);

		const formData = new FormData();
		formData.append("file", image);
		formData.append("userId", userId);

		try {
			const response = await fetch(`${API_URL}/image/upload`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to upload image");
			}

			const responseData = await response.json();
			setData(responseData);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { uploadImage, isLoading, error, data };
};

export default useImageUpload;
