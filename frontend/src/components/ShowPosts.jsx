import React, { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

import axiosInstance from "@/utils/axiosInterceptor";

const initialValues = {
	comment: "",
};

const validationSchema = Yup.object().shape({
	comment: Yup.string().required("comment is required"),
});

const ShowPosts = ({ postData, mutateData }) => {
	const [postId, setPostId] = useState();

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			values.postId = postId;
			resetForm();
			const response = await axiosInstance.post("/add-comment", values);
			console.log("Form submitted:", response.data);
			toast.success("Commment Added", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			mutateData("/get-post");
		} catch (error) {
			console.log(error);
			toast.error("Error while adding comment", {
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

	console.log(postData);
	return (
		<>
			<div className="post">
				{postData?.map((val, i) => (
					<div className="post-container" key={i}>
						<div className="post-header">
							<div className="image-circle"> </div>
							<div className="text">{val?.user?.userName}</div>
						</div>
						<div className="post-body">{val?.text}</div>
						<div className="post-footer">
							<div className="comments-input-container">
								<Formik
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={handleSubmit}
								>
									{({ isValid, dirty, isSubmitting }) => (
										<Form>
											<div style={{ display: "flex", width: "100%" }}>
												<Field
													className="input-field"
													type="text"
													id="comment"
													name="comment"
													placeholder="Add Comment"
												/>
												<button
													type="submit"
													onClick={() => {
														setPostId(val._id);
													}}
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
							{val.comments?.map((data, i) => (
								<div className="comments-container" key={i}>
									<div className="image-circle"> </div>
									<div>
										<div className="user-id">{data.user.userName}</div>
										<div className="comment">{data.comment}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
				{postData == undefined || postData?.length < 1 ? (
					<div className="response-container">
						No post related to this field you cand add posts related to this
						field
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default ShowPosts;
