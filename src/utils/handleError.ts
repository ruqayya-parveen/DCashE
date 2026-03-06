export const tryCatchForNonPromiseMethod = <ArgsType extends unknown[]>(
	fn: (...args: ArgsType) => void = () => { },
	message = 'Error occured in handleError method ::',
	...args: ArgsType
) => {
	try {
		fn(...args);
	} catch (error) {
		console.error(message, error);
	}
};

export const tryCatchForSuccess = <ResponseType, ParamsType = unknown, DataType = unknown>(
	fn: (
		...args: [response: ResponseType, params: ParamsType, data: DataType]
	) => void = () => { },
	url: string,
	...args: [response: ResponseType, params: ParamsType, data: DataType]
): void => {
	return tryCatchForNonPromiseMethod<[response: ResponseType, params: ParamsType, data: DataType]>(
		fn,
		`Error occured in success method of ${url} ::`,
		...args
	);
};
