import React from "react";
import useSWR, { mutate } from "swr";
import axiosInstance from "@/utils/axiosInterceptor";
import ShowPosts from "./ShowPosts";
import CircularProgress from "@mui/material/CircularProgress";

const GetPosts = () => {
	const fetchData = axiosInstance.get;

	const { data, error, isLoading } = useSWR("/get-post", fetchData);

	const handleMutate = () => {
		// Trigger a re-fetch of the data using the mutate function
		mutate("/get-post");
	};
	return (
		<>
			{isLoading ? (
				<div className="loader-container">
					<CircularProgress />
				</div>
			) : error ? (
				<div className="response-container">No data Fould</div>
			) : (
				<ShowPosts postData={data?.data} mutateData={handleMutate} />
			)}
		</>
	);
};

export default GetPosts;
