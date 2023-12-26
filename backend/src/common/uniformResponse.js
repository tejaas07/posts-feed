function createApiResponse(success, data, error, statusCode) {
	return {
		success: success,
		data: data || null,
		error: error || null,
		statusCode: statusCode || 200,
	};
}

module.exports = createApiResponse;
