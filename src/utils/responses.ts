export type ServiceResponse<T = null> = SuccessResponse<T> | FailureResponse;

interface SuccessResponse<T> {
	success: true;
	message: string;
	responseObject: T;
	statusCode: number;
}

interface FailureResponse {
	success: false;
	message: string;
	statusCode: number;
}
