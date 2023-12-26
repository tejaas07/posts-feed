import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Replace with your actual API base URL

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		// You can modify the request config here (e.g., add headers)
		const token = localStorage.getItem("token");

		// If the token exists, add it to the headers
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		// Handle request errors
		return Promise.reject(error);
	}
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		// You can modify the response data here
		return response.data;
	},
	(error) => {
		// Handle response errors
		if (error.response) {
			console.error("Response error:", error.response.data);
			return Promise.reject(error.response.data);
		} else if (error.request) {
			console.error("Request error:", error.request);
			return Promise.reject("No response from the server");
		} else {
			console.error("Error:", error.message);
			return Promise.reject(error.message);
		}
	}
);

export default axiosInstance;
