import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import ShowPosts from "./ShowPosts";
import axiosInstance from "@/utils/axiosInterceptor";
import CircularProgress from "@mui/material/CircularProgress";
import AddPost from "./AddPost";
import { toast } from "react-toastify";

const initialValues = {
	query: "",
};

const Search = ({ setSearchOn, search }) => {
	const [searchData, setSearchData] = useState();
	const [loader, setLoader] = useState(false);

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			setLoader(false);
			const response = await axiosInstance.get(`/search?query=${values.query}`);
			setSearchData(response);
			resetForm();
		} catch (error) {
			toast.error("Error while sending request", {
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
		<>
			<div>
				<Formik initialValues={initialValues} onSubmit={handleSubmit}>
					{({ isValid, dirty, isSubmitting, values }) => (
						<Form>
							<div className="searchbar">
								<Field
									className="input-field"
									type="text"
									id="query"
									name="query"
									placeholder="Search post or comments"
									onInput={() => {
										setSearchOn(true);
										setLoader(true);
									}}
								/>
								<button
									type="submit"
									className="primary-button"
									disabled={!isValid || !dirty || isSubmitting}
								>
									Search
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<AddPost />

			<div>
				{loader ? (
					<div className="loader-container">
						<CircularProgress />
					</div>
				) : search ? (
					<ShowPosts postData={searchData?.data} />
				) : (
					""
				)}
			</div>
		</>
	);
};

export default Search;
