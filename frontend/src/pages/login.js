import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInterceptor";

const Login = () => {
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = async () => {
		try {
			// Make a request to your authentication endpoint
			const response = await axiosInstance.post("/signin", {
				userName,
				password,
			});

			// Assuming your API returns a JWT token in response
			const token = response.data.token;

			// Store the token in a secure way (e.g., in a cookie or localStorage)
			localStorage.setItem("token", token);

			// Redirect to the home page or another protected route
			router.push("/");
		} catch (error) {
			console.error("Login failed:", error.error);
			let err;
			if (error?.error) {
				err = error.error;
			} else {
				err = error;
			}
			console.log(err);
			toast.error(err, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<label>
				username:
				<input
					type="text"
					value={userName}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>
			<br />
			<label>
				Password:
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<br />
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
