import Head from "next/head";
import GetPosts from "@/components/GetPosts";
import Search from "@/components/Search";
import { useState } from "react";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const Home = () => {
	const [searchOn, setSearchOn] = useState(false);

	const router = useRouter();

	useEffect(() => {
		// Check if the user is authenticated (e.g., token is present)
		const token = localStorage.getItem("token");

		if (!token) {
			// Redirect to the login page if not authenticated
			router.push("/login");
			return;
		}

		try {
			// Decode the token
			const decodedToken = jwt.decode(token);

			// Check if the token is expired
			const isTokenExpired = decodedToken.exp * 1000 < Date.now();

			if (isTokenExpired) {
				// If the token is expired, redirect to login
				router.push("/login");
			}
		} catch (error) {
			console.error("Error decoding token:", error);
			// Handle decoding error (e.g., token is not valid)
			router.push("/login");
		}
	}, []);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<>
					<Container>
						<Search setSearchOn={setSearchOn} search={searchOn} />
						{!searchOn && <GetPosts />}
					</Container>
				</>
			</main>
		</>
	);
};

export default Home;