import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import axiosInstance from "@/utils/axiosInterceptor";
import { toast } from "react-toastify";

const initialValues = {
	text: "",
};

const AddPost = () => {
	const [handleForm, setHandleForm] = useState(false);

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			resetForm();
			const response = await axiosInstance.post("/add-post", values);
			setHandleForm(!handleForm);
			toast.success("Post created", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		} catch (error) {
			console.log(error);
			toast.error("Error while adding post", {
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
			<div className="add-user-button">
				<button
					className="primary-button"
					onClick={() => {
						setHandleForm(!handleForm);
					}}
				>
					{handleForm ? "Cancel" : "Add Post"}
				</button>
			</div>
			{handleForm && (
				<div className="add-post">
					<div className="add-post-heading">Add Post</div>
					<div className="add-post-user">
						<div>
							<Formik initialValues={initialValues} onSubmit={handleSubmit}>
								{({ isValid, dirty, isSubmitting }) => (
									<Form>
										<div className="input-container">
											<label htmlFor="text">Caption:</label>{" "}
											<Field
												className="input-field"
												type="text"
												id="text"
												name="text"
												placeholder="Add text"
											/>
											<button
												type="submit"
												className="primary-button"
												disabled={!isValid || !dirty || isSubmitting}
											>
												Submit
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
						<div>Your Id:tejaas07</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AddPost;
